using System.Threading.Tasks;
using Lore.Application.Common.Models;

namespace Lore.Application.Common.Interfaces.Services
{
    public interface IUserManager
    {
        Task<UserModel> GetUserById(string userId);
        Task < (OperationResult Result, string UserId) > CreateUser(string userName, string password);
        Task<OperationResult> DeleteUser(string userId);
    }
}
