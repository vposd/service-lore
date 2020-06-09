using System.Threading;
using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Common.Commands.ChangeDeletedStatus;
using Lore.Application.Common.Models;
using Lore.Application.Failures.Commands.UpsertFailure;
using Lore.Application.Failures.Queries.GetFailures;
using Lore.Domain.Entities;
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
        public async Task<IActionResult> Query(DataQuery query, CancellationToken cancellationToken)
        {
            var vm = await Mediator.Send(query.ToRequest<GetFailuresQuery>(), cancellationToken);
            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UpsertFailureCommand command, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> MarkAsDelete(long id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(ChangeDeletedStatusCommand<Failure>.Delete(id), cancellationToken);
            return Ok(result);
        }

        [HttpPatch]
        [Route("{id}/restore")]
        public async Task<IActionResult> Restore(long id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(ChangeDeletedStatusCommand<Failure>.Restore(id), cancellationToken);
            return Ok(result);
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] UpsertFailureCommand command, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new UpsertFailureCommand
            {
                Id = id,
                Name = command.Name,
                Deleted = command.Deleted
            }, cancellationToken);

            return Ok(result);
        }
    }
}
