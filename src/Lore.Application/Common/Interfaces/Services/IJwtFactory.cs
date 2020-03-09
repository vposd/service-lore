using System.Collections.Generic;
using Lore.Application.Common.Models;

namespace Lore.Application.Common.Interfaces.Services
{
    public interface IJwtFactory
    {
        AccessToken GenerateToken(string id, IList<string> roles);
    }
}
