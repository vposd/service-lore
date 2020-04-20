using Lore.Application.Common.Models;
using Lore.Application.OrderStates.Models;
using MediatR;

namespace Lore.Application.OrderStates.Queries.GetOrderStates
{
    public class GetOrderStatesQuery : QueryRequest, IRequest<QueryResult<OrderStateModel>>
    {
    }
}
