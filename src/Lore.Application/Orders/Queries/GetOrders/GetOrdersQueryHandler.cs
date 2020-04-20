using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Extensions.Linq;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Application.Orders.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lore.Application.Orders.Queries.GetOrders
{
    public class GetOrdersQueryHandler : IRequestHandler<GetOrdersQuery, QueryResult<OrderQueryModel>>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public GetOrdersQueryHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<QueryResult<OrderQueryModel>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var results = await context.Orders
                .AsNoTracking()
                .Where(x => x.Deleted == 0)
                .Select(x => new OrderQueryModel
                {
                    Id = x.Id,
                    CustomerId = x.CustomerId,
                    CustomerName = x.Customer.Name,
                    CustomerPhone = x.Customer.Phone,
                    OrderDeviceName = x.OrderDevice.Device.Name,
                    OrderDeviceDescription = x.OrderDevice.Description
                })
                .ApplyQuery(request, out var count)
                .ToListAsync(cancellationToken);

            return new QueryResult<OrderQueryModel>
            {
                Results = results,
                Count = count
            };
        }
    }
}
