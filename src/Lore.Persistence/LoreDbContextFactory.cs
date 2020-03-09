using Lore.Application.Common.Interfaces;
using Lore.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Lore.Persistence.Data
{
    public class LoreDbContextFactory : DesignTimeDbContextFactoryBase<LoreDbContext>, ILoreDbContextFactory
    {
        protected override LoreDbContext CreateNewInstance(DbContextOptions<LoreDbContext> options)
            => new LoreDbContext(options);

        ILoreDbContext ILoreDbContextFactory.Create() => Create();
    }
}
