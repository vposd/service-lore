using System.Threading.Tasks;
using Lore.Application.Common.Models;

namespace Lore.Application.Common.Interfaces.Services
{
    public interface IAuthenticationService
    {
        Task<AuthResult> SignIn(string userName, string password);
        Task<AuthResult> RefreshAccess(string accessToken, string signingKey);
        Task SignOut();
    }
}
