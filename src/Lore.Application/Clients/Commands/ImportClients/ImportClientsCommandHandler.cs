using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Application.Interfaces.Services;
using Lore.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lore.Application.Clients.Commands.ImportClients
{
    public class ImportClientsCommandHandler : IRequestHandler<ImportClientsCommand, ImportOperationResult>
    {
        private readonly ILoreDbContextFactory contextFactory;
        private readonly IExcelReader excelReader;

        public ImportClientsCommandHandler(
            ILoreDbContextFactory contextFactory,
            IExcelReader excelReader)
        {
            this.contextFactory = contextFactory;
            this.excelReader = excelReader;
        }

        public async Task<ImportOperationResult> Handle(ImportClientsCommand request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();
            context.ChangeTracker.AutoDetectChangesEnabled = false;
            context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

            var results = new List<Client>();

            context.Clients.AddRange(results);
            var rowsCount = await context.SaveChangesAsync(cancellationToken);

            return ImportOperationResult.Success(rowsCount);
        }
    }
}
