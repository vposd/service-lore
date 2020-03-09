using System;
using System.Security.Cryptography;
using Lore.Application.Common.Interfaces.Services;

namespace Lore.Infrastructure.Identity.Services
{
    internal sealed class TokenFactory : ITokenFactory
    {
        public string GenerateToken(int size = 32)
        {
            var randomNumber = new byte[size];

            using var rng = RandomNumberGenerator.Create();

            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }
}
