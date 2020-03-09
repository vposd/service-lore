using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Lore.Application.Common.Exceptions;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Interfaces.Services;
using Lore.Application.Common.Models;

namespace Lore.Infrastructure.Identity.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IJwtFactory jwtFactory;
        private readonly IJwtTokenValidator jwtTokenValidator;
        private readonly ICurrentUserService currentUser;
        private readonly IConfiguration configuration;
        private readonly ITokenFactory tokenFactory;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly UserManager<ApplicationUser> userManager;

        public AuthenticationService(
            IJwtFactory jwtFactory,
            ICurrentUserService currentUser,
            IConfiguration configuration,
            IJwtTokenValidator jwtTokenValidator,
            ITokenFactory tokenFactory,
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager)
        {
            this.tokenFactory = tokenFactory;
            this.jwtTokenValidator = jwtTokenValidator;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.currentUser = currentUser;
            this.jwtFactory = jwtFactory;
            this.userManager = userManager;
        }

        public async Task<AuthResult> SignIn(string userName, string password)
        {
            var result = await signInManager.PasswordSignInAsync(userName, password, true, false);
            if (!result.Succeeded)
            {
                throw new BadRequestException("Invalid username or password");
            }

            var user = await userManager.FindByNameAsync(userName);
            if (user == null)
            {
                throw new NotFoundException("User does not exist");
            }

            return await GenerateAccessAndRefreshTokens(user);
        }

        public async Task<AuthResult> RefreshAccess(string accessToken, string refreshToken)
        {
            var signingKey = configuration.GetSection("Jwt:Secret").Value;
            var cp = jwtTokenValidator.GetPrincipalFromToken(accessToken, signingKey);

            if (cp == null)
            {
                throw new BadRequestException("Access token is not valid");
            }

            var userId = cp.Claims.First(c => c.Type == ClaimTypes.Name);
            var user = await userManager.FindByIdAsync(userId.Value);
            var isValid = await userManager.VerifyUserTokenAsync(user, "RefreshApplicationAccess", "RefreshToken", refreshToken);

            if (!isValid)
            {
                throw new BadRequestException("Invalid access token");
            }

            return await GenerateAccessAndRefreshTokens(user);
        }

        public async Task SignOut()
        {
            var userId = currentUser.UserId;
            if (userId == null)
            {
                return;
            }

            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return;
            }

            await signInManager.SignOutAsync();
            await userManager.RemoveAuthenticationTokenAsync(user, "RefreshApplicationAccess", "RefreshToken");
        }

        private async Task<AuthResult> GenerateAccessAndRefreshTokens(ApplicationUser user)
        {
            var roles = await userManager.GetRolesAsync(user);
            var accessToken = jwtFactory.GenerateToken(user.Id.ToString(), roles);
            var refreshToken = await userManager.GenerateUserTokenAsync(user, "RefreshApplicationAccess", "RefreshToken");

            await userManager.SetAuthenticationTokenAsync(user, "RefreshApplicationAccess", "RefreshToken", refreshToken);

            return new AuthResult
            {
                AccessToken = accessToken.Token,
                    Expires = accessToken.ValidTo,
                    RefreshToken = refreshToken,
            };
        }
    }
}
