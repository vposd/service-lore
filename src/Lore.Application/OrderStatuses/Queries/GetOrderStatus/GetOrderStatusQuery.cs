using Lore.Application.OrderStatuses.Models;
using MediatR;

namespace Lore.Application.OrderStatuses.Queries.GetOrderStatus
{
    public class GetOrderStatusQuery : IRequest<OrderStatusModel>
    {
        public long Id { get; set; }
    }
}
