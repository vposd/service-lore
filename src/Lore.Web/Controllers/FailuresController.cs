using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Common.Models;
using Lore.Application.Failures.Commands.UpsertFailure;
using Lore.Application.Failures.Queries.GetFailures;
using Lore.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lore.Web.Controllers
{
    [Authorize]
    [Route("api/failures")]
    [ApiController]
    public class FailuresController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> Query(DataQuery query)
        {
            var vm = await Mediator.Send(query.ToRequest<GetFailuresQuery>());
            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UpsertFailureCommand command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] UpsertFailureCommand command)
        {
            var result = await Mediator.Send(new UpsertFailureCommand
            {
                Id = id,
                Name = command.Name,
                Deleted = command.Deleted
            });

            return Ok(result);
        }
    }
}
