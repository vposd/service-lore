using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Common.Models;
using Lore.Application.OrderStates.Commands.UpsertOrderState;
using Lore.Application.OrderStates.Queries.GetOrderStates;
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
            var vm = await Mediator.Send(query.ToRequest<GetOrderStatesQuery>());
            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UpsertOrderStateCommand command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] UpsertOrderStateCommand command)
        {
            var result = await Mediator.Send(new UpsertOrderStateCommand
            {
                Id = id,
                Name = command.Name,
                Color = command.Color
            });

            return Ok(result);
        }
    }
}
