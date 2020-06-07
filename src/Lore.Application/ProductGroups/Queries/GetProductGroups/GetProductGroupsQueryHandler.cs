using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Extensions.Linq;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Application.ProductGroups.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lore.Application.ProductGroups.Queries.GetProductGroups
{
    public class GetProductGroupsQueryHandler : IRequestHandler<GetProductGroupsQuery, QueryResult<ProductGroupModel>>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public GetProductGroupsQueryHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<QueryResult<ProductGroupModel>> Handle(GetProductGroupsQuery query, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var results = await context.ProductGroups
                .Select(x => new ProductGroupModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Deleted = x.Deleted,
                    Parent = context.ProductGroups
                        .Where(g => g.Id == g.ParentId)
                        .Select(g => new SimpleEntityModel { Id = g.Id, Name = g.Name })
                        .FirstOrDefault(),
                })
                .ApplyQuery(query, out var count)
                .ToListAsync(cancellationToken);

            return new QueryResult<ProductGroupModel>
            {
                Results = results,
                Count = count
            };
        }
    }
}
