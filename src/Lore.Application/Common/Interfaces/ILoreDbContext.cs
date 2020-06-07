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
        DbSet<Customer> Customers { get; set; }
        DbSet<Order> Orders { get; set; }
        DbSet<OrderItem> OrderItems { get; set; }
        DbSet<Failure> Failures { get; set; }
        DbSet<Device> Devices { get; set; }
        DbSet<OrderStatus> OrderStatuses { get; set; }
        DbSet<Employee> Employees { get; set; }
        DbSet<Attribute> Attributes { get; set; }
        DbSet<AttributeValue> AttributesValues { get; set; }
        DbSet<ProductGroup> ProductGroups { get; set; }
        DbSet<Product> Products { get; set; }
        DbSet<TEntity> Set<TEntity>() where TEntity : class;

        DatabaseFacade Database { get; }
        ChangeTracker ChangeTracker { get; }


        void SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
