using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Lore.Application.Common.Interfaces.Services;
using Lore.Application.Common.Models;

namespace Lore.Infrastructure.Identity.Services
{
    internal sealed class JwtFactory : IJwtFactory
    {
        private readonly IConfiguration configuration;

        public JwtFactory(
            IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public AccessToken GenerateToken(string id, IList<string> roles)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var secret = Encoding.ASCII.GetBytes(configuration.GetSection("Jwt:Secret").Value);
            var tokenSubject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, id),
            });

            foreach (var role in roles)
            {
                tokenSubject.AddClaim(new Claim(ClaimTypes.Role, role));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = configuration.GetSection("Jwt:Issuer").Value,
                Audience = configuration.GetSection("Jwt:Audience").Value,
                Subject = tokenSubject,
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secret), SecurityAlgorithms.HmacSha256Signature)
            };

            var securityToken = tokenHandler.CreateJwtSecurityToken(tokenDescriptor);

            return new AccessToken(tokenHandler.WriteToken(securityToken), ToUnixEpochDate(securityToken.ValidTo));
        }

        private int ToUnixEpochDate(DateTime date) => (int)Math.Round((date.ToUniversalTime() -
                new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero))
            .TotalSeconds);
    }
}
