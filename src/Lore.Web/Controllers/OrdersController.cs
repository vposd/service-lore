using System.Threading;
using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Common.Models;
using Lore.Application.Orders.Commands.UpdateOrderState;
using Lore.Application.Orders.Queries.GetOrder;
using Lore.Application.Orders.Queries.GetOrders;
using Lore.Web.Contracts.Orders;
using Lore.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lore.Web.Controllers
{
    [Authorize]
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> Query(DataQuery query, CancellationToken cancellationToken)
        {
            var vm = await Mediator.Send(query.ToRequest<GetOrdersQuery>(), cancellationToken);
            return Ok(vm);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(long id, CancellationToken cancellationToken)
        {
            var vm = await Mediator.Send(new GetOrderQuery { Id = id }, cancellationToken);
            return Ok(vm);
        }

        [HttpPost]
        [Route("{id}/state/{stateId}")]
        public async Task<IActionResult> UpdateOrderState(long id, long stateId, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new UpdateOrderStateCommand { OrderId = id, StateId = stateId }, cancellationToken);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] ProcessOrderRequest request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(ProcessOrderRequest.ToCommand(request), cancellationToken);
            return Ok(result);
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<IActionResult> UpdateOrder([FromBody] ProcessOrderRequest request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(ProcessOrderRequest.ToCommand(request), cancellationToken);
            return Ok(result);
        }
    }
}
