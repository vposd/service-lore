using Lore.Application.Common.Models;
using Lore.Application.Orders.Models;
using MediatR;

namespace Lore.Application.Orders.Queries.GetOrders
{
    public class GetOrdersQuery : QueryRequest, IRequest<QueryResult<OrderQueryModel>>
    {
    }
}
