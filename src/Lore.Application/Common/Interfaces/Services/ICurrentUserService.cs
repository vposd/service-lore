using System.Threading.Tasks;
using Lore.Application.Common.Models;

namespace Lore.Application.Common.Interfaces.Services
{
    public interface ICurrentUserService
    {
        string UserId { get; }
        bool IsAuthenticated { get; }
        Task<UserModel> Get();
    }
}
