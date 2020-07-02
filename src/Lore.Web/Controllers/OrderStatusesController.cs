using System.Threading;
using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Common.Commands.ChangeDeletedStatus;
using Lore.Application.Common.Models;
using Lore.Application.OrderStatuses.Commands.UpsertOrderStatus;
using Lore.Application.OrderStatuses.Queries.GetOrderStatus;
using Lore.Application.OrderStatuses.Queries.GetOrderStatuses;
using Lore.Domain.Entities;
using Lore.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lore.Web.Controllers
{
    [Authorize]
    [Route("api/orderStatuses")]
    [ApiController]
    public class OrderStatusesController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> Query(DataQuery query, CancellationToken cancellationToken)
        {
            var vm = await Mediator.Send(query.ToRequest<GetOrderStatusesQuery>(), cancellationToken);
            return Ok(vm);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(long id, CancellationToken cancellationToken)
        {
            var vm = await Mediator.Send(new GetOrderStatusQuery { Id = id }, cancellationToken);
            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UpsertOrderStatusCommand command, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> MarkAsDelete(long id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(ChangeDeletedStatusCommand<OrderStatus>.Delete(id), cancellationToken);
            return Ok(result);
        }

        [HttpPatch]
        [Route("{id}/restore")]
        public async Task<IActionResult> Restore(long id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(ChangeDeletedStatusCommand<OrderStatus>.Restore(id), cancellationToken);
            return Ok(result);
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] UpsertOrderStatusCommand command, CancellationToken cancellationToken)
        {
            command.Id = id;
            var result = await Mediator.Send(command, cancellationToken);

            return Ok(result);
        }
    }
}
