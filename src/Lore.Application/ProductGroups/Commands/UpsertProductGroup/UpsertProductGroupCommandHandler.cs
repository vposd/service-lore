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

            ProductGroup productGroup;

            if (!command.Id.HasValue)
            {
                productGroup = new ProductGroup
                {
                    ParentId = command.Parent.Id,
                    Name = command.Name
                };
                context.ProductGroups.Add(productGroup);
            }
            else
            {
                productGroup = await context.ProductGroups.FindAsync(command.Id);
            }

            productGroup.Name = command.Name;
            productGroup.ParentId = command.Parent.Id;

            await context.SaveChangesAsync(cancellationToken);

            return OperationResult.Success();
        }
    }
}
