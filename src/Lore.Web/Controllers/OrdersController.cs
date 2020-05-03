using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Common.Models;
using Lore.Application.Orders.Commands.CreateOrder;
using Lore.Application.Orders.Commands.UpdateOrderState;
using Lore.Application.Orders.Events.OrderCreated;
using Lore.Application.Orders.Queries.GetOrders;
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
        public async Task<IActionResult> Query(DataQuery query)
        {
            var vm = await Mediator.Send(query.ToRequest<GetOrdersQuery>());
            return Ok(vm);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            await Mediator.Publish(new OrderCreatedEvent { OrderId = id });
            return Ok();
        }

        [HttpPost]
        [Route("{id}/state/{stateId}")]
        public async Task<IActionResult> UpdateOrderState(long id, long stateId)
        {
            var result = await Mediator.Send(new UpdateOrderStateCommand { OrderId = id, StateId = stateId });
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateOrderCommand command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }
    }
}
