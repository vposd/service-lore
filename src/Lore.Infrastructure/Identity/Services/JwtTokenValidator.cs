using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Lore.Application.Common.Interfaces.Services;

namespace Lore.Infrastructure.Identity.Services
{
    public class JwtTokenValidator : IJwtTokenValidator
    {
        private readonly JwtSecurityTokenHandler jwtSecurityTokenHandler;
        private readonly IConfiguration configuration;

        public JwtTokenValidator(
            IConfiguration configuration)
        {
            jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            this.configuration = configuration;
        }

        public ClaimsPrincipal GetPrincipalFromToken(string token, string signingKey) =>
            ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false, // dont validate lifetime 'cause token may be expired
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey)),
                    ValidAudience = configuration.GetSection("Jwt:Audience").Value,
                    ValidIssuer = configuration.GetSection("Jwt:Issuer").Value,
            });

        public ClaimsPrincipal ValidateToken(string token, TokenValidationParameters tokenValidationParameters)
        {
            var principal = jwtSecurityTokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);

            if (!(securityToken is JwtSecurityToken jwtSecurityToken) ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }
    }
}
