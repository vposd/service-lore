using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using LinqToDB.Data;
using LinqToDB.EntityFrameworkCore;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Interfaces.Services;
using Lore.Domain.Common;
using Lore.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Lore.Persistence
{
    public class LoreDbContext : DbContext, ILoreDbContext
    {
        private readonly ICurrentUserService currentUser;

        public LoreDbContext(
            DbContextOptions<LoreDbContext> options) : base(options)
        {
            LinqToDBForEFTools.Initialize();
        }

        public LoreDbContext(
            DbContextOptions<LoreDbContext> options,
            ICurrentUserService currentUser) : base(options)
        {
            this.currentUser = currentUser;
            LinqToDBForEFTools.Initialize();
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Employee> Employees { get; set; }

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

        public async Task<int> BulkSaveChanges<T>(List<T> source, CancellationToken cancellationToken) where T : class
        {
            if (!cancellationToken.IsCancellationRequested)
            {
                var result = this.BulkCopy(source);
                return (int)result.RowsCopied;
            }
            return 0;
        }

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
