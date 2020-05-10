using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Common.Models;
using Lore.Application.OrderStatuses.Commands.UpsertOrderStatus;
using Lore.Application.OrderStatuses.Queries.GetOrderStatus;
using Lore.Application.OrderStatuses.Queries.GetOrderStatuses;
using Lore.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lore.Web.Controllers
{
    [Authorize]
    [Route("api/orderStates")]
    [ApiController]
    public class OrderStatesController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> Query(DataQuery query)
        {
            var vm = await Mediator.Send(query.ToRequest<GetOrderStatusesQuery>());
            return Ok(vm);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var vm = await Mediator.Send(new GetOrderStatusQuery { Id = id });
            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UpsertOrderStatusCommand command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] UpsertOrderStatusCommand command)
        {
            command.Id = id;
            var result = await Mediator.Send(command);

            return Ok(result);
        }
    }
}
