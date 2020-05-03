using System;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Interfaces.Services;
using Lore.Domain.Common;
using Lore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Attribute = Lore.Domain.Entities.Attribute;

namespace Lore.Persistence
{
    public class LoreDbContext : DbContext, ILoreDbContext
    {
        private readonly ICurrentUserService currentUser;

        public LoreDbContext(
            DbContextOptions<LoreDbContext> options) : base(options)
        {
        }

        public LoreDbContext(
            DbContextOptions<LoreDbContext> options,
            ICurrentUserService currentUser) : base(options)
        {
            this.currentUser = currentUser;
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OrderDevice> OrderDevices { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<OrderStatus> OrderStates { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Attribute> Attributes { get; set; }
        public DbSet<AttributeValue> AttributesValues { get; set; }
        public DbSet<ProductGroup> ProductGroups { get; set; }
        public DbSet<Product> Products { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedBy = currentUser?.UserId;
                        entry.Entity.Created = DateTime.Now;
                        break;
                    case EntityState.Modified:
                        entry.Entity.LastModifiedBy = currentUser?.UserId;
                        entry.Entity.LastModified = DateTime.Now;
                        break;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
        void ILoreDbContext.SaveChanges() => base.SaveChanges();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("dbo");

            ApplyConfigurations(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }

        private void ApplyConfigurations(ModelBuilder modelBuilder)
        {
            var typesToRegister = Assembly.GetExecutingAssembly().GetTypes()
                .Where(t => t.GetInterfaces().Any(gi => gi.IsGenericType && gi.GetGenericTypeDefinition() == typeof(IEntityTypeConfiguration<>))).ToList();

            foreach (var type in typesToRegister)
            {
                dynamic configurationInstance = Activator.CreateInstance(type);
                modelBuilder.ApplyConfiguration(configurationInstance);
            }
        }
    }
}
