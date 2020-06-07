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

            Product product;
            if (request.Id.HasValue)
            {
                product = await context.Products.FindAsync(request.Id);
            }
            else
            {
                product = new Product();
                context.Products.Add(product);
            }

            product.Name = request.Name;
            product.ProductGroupId = request.Group.Id;
            product.Description = request.Description;
            product.Price = request.Price;

            await context.SaveChangesAsync(cancellationToken);

            return OperationResult.Success();
        }
    }
}
