using Microsoft.EntityFrameworkCore;

namespace Lore.Infrastructure.Identity
{
    public class ApplicationIdentityDbContextFactory : DesignTimeDbContextFactoryBase<ApplicationIdentityDbContext>
    {
        protected override ApplicationIdentityDbContext CreateNewInstance(DbContextOptions<ApplicationIdentityDbContext> options)
        {
            return new ApplicationIdentityDbContext(options);
        }
    }
}
