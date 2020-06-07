using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Extensions.Linq;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Application.Products.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lore.Application.Products.Queries.GetProducts
{
    public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, QueryResult<ProductModel>>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public GetProductsQueryHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<QueryResult<ProductModel>> Handle(GetProductsQuery query, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var results = await context.Products
                .Select(x => new ProductModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Price = x.Price,
                    Description = x.Description,
                    Deleted = x.Deleted,
                    Group = new SimpleEntityModel
                    {
                        Id = x.ProductGroup.Id,
                        Name = x.ProductGroup.Name,
                    }
                })
                .ApplyQuery(query, out var count)
                .ToListAsync(cancellationToken);

            return new QueryResult<ProductModel>
            {
                Results = results,
                Count = count
            };
        }
    }
}
