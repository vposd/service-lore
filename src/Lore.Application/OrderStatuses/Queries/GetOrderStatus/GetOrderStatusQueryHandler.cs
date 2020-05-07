using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.OrderStatuses.Models;
using Lore.Application.OrderStatuses.Queries.GetOrderStatus;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lore.Application.Orders.Queries.GetOrderStatus
{
    public class GetOrderStatusQueryHandler : IRequestHandler<GetOrderStatusQuery, OrderStatusModel>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public GetOrderStatusQueryHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<OrderStatusModel> Handle(GetOrderStatusQuery query, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var vm = await context.OrderStates
                .AsNoTracking()
                .Where(x => x.Id == query.Id)
                .Select(x => new OrderStatusModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Color = x.Color,
                    Deleted = x.Deleted,
                    IsDefault = x.IsDefault
                })
                .FirstOrDefaultAsync(cancellationToken);

            return vm;
        }
    }
}
