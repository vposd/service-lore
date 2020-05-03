using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Extensions.Linq;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Application.Orders.Models;
using Lore.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using static Lore.Application.Orders.Models.OrderReadModel;

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
                .Where(x => x.Deleted == 0)
                .Select(x => new OrderReadModel
                {
                    Id = x.Id,
                    StatusId = x.StateHistory
                        .OrderBy(s => s.Created)
                        .LastOrDefault()
                        .OrderStatusId,
                    Customer = new CustomerModel
                    {
                        Id = x.CustomerId,
                        Name = x.Customer.Name,
                        Phone = x.Customer.Phone
                    },
                    OrderDevice = new OrderDeviceModel
                    {
                        Id = x.OrderDevice.Id,
                        Device = new DeviceModel
                        {
                            Id = x.OrderDevice.DeviceId,
                            SerialNumber = x.OrderDevice.Device.SerialNumber,
                            Name = x.OrderDevice.Device.Name,
                            Attributes = GetAttributes(x.OrderDevice.Device.Attributes)
                        },
                        Attributes = GetAttributes(x.OrderDevice.OrderDeviceAttributes)
                    }
                })
                .ApplyQuery(request, out var count)
                .ToListAsync(cancellationToken);

            return new QueryResult<OrderReadModel>
            {
                Results = results,
                Count = count
            };
        }

        private static IEnumerable<AttributeModel> GetAttributes(ICollection<ObjectAttributeValue> attributeValues)
            => attributeValues
                .GroupBy(g => g.Id)
                .Select(v => new AttributeModel
                {
                    Id = v.Key,
                    Type = v.FirstOrDefault().Attribute.Type,
                    Values = v
                        .Select(a => new AttributeValueModel
                        {
                            Id = a.AttributeValue.Id,
                            Value = a.AttributeValue.Value
                        })
                        .ToList()
                });
    }
}
