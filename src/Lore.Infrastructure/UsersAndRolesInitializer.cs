using Lore.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace Lore.Infrastructure
{
    public static class UsersAndRolesInitializer
    {
        public static void SeedData(
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager)
        {
            SeedRoles(roleManager);
            SeedUsers(userManager);
        }

        private static void SeedUsers(UserManager<ApplicationUser> userManager)
        {
            if (userManager.FindByNameAsync("sa").Result == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "sa",
                    Email = "sa@localhost",
                    FirstName = "John",
                    LastName = "Doe"
                };

                var result = userManager.CreateAsync(user, "1A4d7m9i6n3!").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Admin").Wait();
                }
            }

            if (userManager.FindByNameAsync("user").Result == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "user",
                    Email = "user@localhost",
                    FirstName = "User",
                    LastName = "LastName"
                };

                var result = userManager.CreateAsync(user, "1A4d7m9i6n3!").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "User").Wait();
                }
            }
        }

        private static void SeedRoles(RoleManager<ApplicationRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("User").Result)
            {
                var role = new ApplicationRole
                {
                    Name = "User"
                };
                var roleResult = roleManager.CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync("Admin").Result)
            {
                var role = new ApplicationRole
                {
                    Name = "Admin"
                };
                var roleResult = roleManager.CreateAsync(role).Result;
            }
        }
    }

}
