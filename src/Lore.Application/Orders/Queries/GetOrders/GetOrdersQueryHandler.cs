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
    public class GetOrdersQueryHandler : IRequestHandler<GetOrdersQuery, QueryResult<OrderReadModel>>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public GetOrdersQueryHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<QueryResult<OrderReadModel>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var results = await context.Orders
                .AsNoTracking()
                .Where(x => !x.Deleted)
                .Select(x => new OrderReadModel
                {
                    Id = x.Id,
                    StatusId = x.StateHistory
                        .OrderBy(s => s.Created)
                        .LastOrDefault()
                        .OrderStatusId,
                    DateIn = x.DateIn,
                    DateOut = x.DateOut,
                    Customer = new CustomerModel
                    {
                        Id = x.CustomerId,
                        Name = x.Customer.Name,
                        Phone = x.Customer.Phone
                    },
                    Device = new DeviceReadModel
                    {
                        Id = x.Device.Id,
                        SerialNumber = x.Device.SerialNumber,
                        Name = x.Device.Name,
                        Attributes = x.Device.Attributes
                            .Select(v => new AttributeReadModel
                            {
                                Id = v.AttributeId,
                                Type = v.Attribute.Type,
                                Name = v.Attribute.Name,
                                Value = new AttributeValueReadModel
                                {
                                    Id = v.AttributeValue.Id,
                                    Value = v.AttributeValue.Value
                                }
                            })
                    },
                    Failures = x.DeviceFailures
                        .Select(v => new SimpleEntityModel
                        {
                            Id = v.Id,
                            Name = v.Failure.Name
                        })
                })
                .ApplyQuery(request, out var count)
                .ToListAsync(cancellationToken);

            return new QueryResult<OrderReadModel>
            {
                Results = results,
                Count = count
            };
        }
    }
}
