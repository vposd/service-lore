using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Lore.Infrastructure.Identity;

namespace Lore.Infrastructure
{
    public static class ConfigureExtension
    {
        public static void UseInfrastructure(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>()
                .CreateScope();
            using var applicationContext = serviceScope.ServiceProvider.GetService<ApplicationIdentityDbContext>();
            applicationContext.Database.Migrate();
        }

        public static void SeedData(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>()
                .CreateScope();
            var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            UsersAndRolesInitializer.SeedData(userManager, roleManager);
        }
    }
}
