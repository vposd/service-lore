using Lore.Application.Common.Interfaces;
using Lore.Persistence.Data;
using Microsoft.Extensions.DependencyInjection;

namespace Lore.Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services)
        {
            services.AddScoped<LoreDbContextFactory>();
            services.AddScoped<ILoreDbContextFactory>(provider => provider.GetService<LoreDbContextFactory>());

            return services;
        }
    }
}
