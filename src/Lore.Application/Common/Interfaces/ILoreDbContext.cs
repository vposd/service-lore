using System;
using System.Threading;
using System.Threading.Tasks;
using Lore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Attribute = Lore.Domain.Entities.Attribute;

namespace Lore.Application.Common.Interfaces
{
    public interface ILoreDbContext : IDisposable
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Failure> Failures { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Attribute> Attributes { get; set; }
        public DbSet<AttributeValue> AttributesValues { get; set; }
        public DbSet<ProductGroup> ProductGroups { get; set; }
        public DbSet<Product> Products { get; set; }

        DatabaseFacade Database { get; }
        ChangeTracker ChangeTracker { get; }

        void SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
