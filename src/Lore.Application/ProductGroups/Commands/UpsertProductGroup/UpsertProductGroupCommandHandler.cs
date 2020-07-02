using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.ProductGroups.Commands.UpsertProductGroup
{
    public class UpsertProductGroupCommandHandler : IRequestHandler<UpsertProductGroupCommand, OperationResult>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public UpsertProductGroupCommandHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }


        public async Task<OperationResult> Handle(UpsertProductGroupCommand command, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var entity = new ProductGroup();

            if (!command.Id.HasValue)
            {
                context.ProductGroups.Add(entity);
            }
            else
            {
                entity = await context.ProductGroups.FindAsync(command.Id);
            }

            entity.Name = command.Name;
            entity.ParentId = command.ParentId;

            await context.SaveChangesAsync(cancellationToken);

            return OperationResult.Success();
        }
    }
}
