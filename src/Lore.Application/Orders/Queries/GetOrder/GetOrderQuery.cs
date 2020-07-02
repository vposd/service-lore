using Lore.Application.Orders.Models;
using MediatR;

namespace Lore.Application.Orders.Queries.GetOrder
{
    public class GetOrderQuery : IRequest<OrderReadModel>
    {
        public long Id { get; set; }
    }
}
