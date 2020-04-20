using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Extensions.Linq;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Application.OrderStates.Models;
using Lore.Application.OrderStates.Queries.GetOrderStates;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lore.Application.Orders.Queries.GetOrderStates
{
    public class GetOrderStatesQueryHandler : IRequestHandler<GetOrderStatesQuery, QueryResult<OrderStateModel>>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public GetOrderStatesQueryHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<QueryResult<OrderStateModel>> Handle(GetOrderStatesQuery request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var results = await context.OrderStates
                .AsNoTracking()
                .Where(x => x.Deleted == 0)
                .OrderBy(x => x.SortOrder)
                .Select(x => new OrderStateModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Color = x.Color,
                    IsDefault = x.IsDefault
                })
                .ApplyQuery(request, out var count)
                .ToListAsync(cancellationToken);

            return new QueryResult<OrderStateModel>
            {
                Results = results,
                Count = count
            };
        }
    }
}
