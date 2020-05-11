using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Extensions.Linq;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Application.OrderStatuses.Models;
using Lore.Application.OrderStatuses.Queries.GetOrderStatuses;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lore.Application.Orders.Queries.GetOrderStatuses
{
    public class GetOrderStatusQueryHandler : IRequestHandler<GetOrderStatusesQuery, QueryResult<OrderStatusModel>>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public GetOrderStatusQueryHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<QueryResult<OrderStatusModel>> Handle(GetOrderStatusesQuery query, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var results = await context.OrderStatuses
                .AsNoTracking()
                .OrderBy(x => x.SortOrder)
                .Select(x => new OrderStatusModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Color = x.Color,
                    Deleted = x.Deleted,
                    SortOrder = x.SortOrder,
                    IsDefault = x.IsDefault,
                    IsFinal = x.isFinal
                })
                .ApplyQuery(query, out var count)
                .ToListAsync(cancellationToken);

            return new QueryResult<OrderStatusModel>
            {
                Results = results,
                Count = count
            };
        }
    }
}
