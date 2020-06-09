using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Common.Interfaces.Services;
using Lore.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lore.Web.Controllers
{
    [Authorize]
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController : BaseController
    {
        private readonly IAuthenticationService authenticationService;

        public AuthenticationController(
            IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("signIn")]
        public async Task<IActionResult> SignIn([FromBody] UserCredentials credentials)
        {
            var result = await authenticationService
                .SignIn(credentials.UserName, credentials.Password);

            return Ok(result);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("refreshAccess")]
        public async Task<IActionResult> RefreshAccess([FromBody] RefreshAccess request)
        {
            var result = await authenticationService
                .RefreshAccess(request.AccessToken, request.RefreshToken);

            return Ok(result);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("signOut")]
        public async Task<IActionResult> SignOut()
        {
            await authenticationService.SignOut();
            return Ok();
        }

    }
}
