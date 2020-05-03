using Lore.Application.Common.Models;
using Lore.Application.OrderStatuses.Models;
using MediatR;

namespace Lore.Application.OrderStatuses.Queries.GetOrderStatuses
{
    public class GetOrderStatusesQuery : QueryRequest, IRequest<QueryResult<OrderStatusModel>>
    {
    }
}
