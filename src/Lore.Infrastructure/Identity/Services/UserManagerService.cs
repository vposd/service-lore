using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Lore.Application.Common.Interfaces.Services;
using Lore.Application.Common.Models;
using Lore.Infrastructure.Identity.Extensions;

namespace Lore.Infrastructure.Identity.Services
{
    public class UserManagerService : IUserManager
    {
        private readonly UserManager<ApplicationUser> userManager;

        public UserManagerService(UserManager<ApplicationUser> userManager) =>
            this.userManager = userManager;

        public async Task < (OperationResult Result, string UserId) > CreateUser(string userName, string password)
        {
            var user = new ApplicationUser
            {
                UserName = userName,
                Email = userName,
            };

            var result = await userManager.CreateAsync(user, password);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<OperationResult> DeleteUser(string userId)
        {
            var user = userManager.Users.SingleOrDefault(u => u.Id == userId);

            if (user != null)
            {
                return await DeleteUserAsync(user);
            }

            return OperationResult.Success();
        }

        public async Task<OperationResult> DeleteUserAsync(ApplicationUser user)
        {
            var result = await userManager.DeleteAsync(user);

            return result.ToApplicationResult();
        }

        public async Task<UserModel> GetUserById(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return null;
            }

            var roles = await userManager.GetRolesAsync(user);

            return new UserModel
            {
                UserId = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Roles = roles
            };
        }

        public async Task<IList<string>> GetRoles(ApplicationUser user)
        {
            var result = await userManager.GetRolesAsync(user);
            return result;
        }
    }
}
