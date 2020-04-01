using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Lore.Application.Common.Interfaces
{
    public interface ILoreDbContext : IDisposable
    {
        public DbSet<Customer> Clients { get; set; }
        public DbSet<Employee> Employees { get; set; }

        DatabaseFacade Database { get; }
        ChangeTracker ChangeTracker { get; }

        Task<int> BulkSaveChanges<T>(List<T> source, CancellationToken cancellationToken) where T : class;
        void SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
