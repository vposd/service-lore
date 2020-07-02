using Lore.Persistence.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Lore.Persistence
{
    public static class ConfigureExtension
    {
        public static void UsePersistense(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>()
                .CreateScope();
            using var context = serviceScope.ServiceProvider.GetService<LoreDbContextFactory>().Create();
            context.Database.Migrate();
        }
    }
}
