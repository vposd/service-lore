using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.Products.Commands.UpsertProduct
{
    public class UpsertProductCommandHandler : IRequestHandler<UpsertProductCommand, OperationResult>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public UpsertProductCommandHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }


        public async Task<OperationResult> Handle(UpsertProductCommand request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var entity = new Product();
            if (request.Id.HasValue)
            {
                entity = await context.Products.FindAsync(request.Id);
            }
            else
            {
                context.Products.Add(entity);
            }

            entity.Name = request.Name;
            entity.ProductGroupId = request.GroupId;
            entity.Description = request.Description;
            entity.Price = request.Price;

            await context.SaveChangesAsync(cancellationToken);

            return OperationResult.Success();
        }
    }
}
