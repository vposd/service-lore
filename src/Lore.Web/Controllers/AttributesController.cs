using System.Threading;
using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Attributes.Commands.UpsertAttribute;
using Lore.Application.Attributes.Queries.GetAttributes;
using Lore.Application.Common.Commands.ChangeDeletedStatus;
using Lore.Application.Common.Models;
using Lore.Domain.Entities;
using Lore.Web.Contracts.Attributes;
using Lore.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lore.Web.Controllers
{
    [Authorize]
    [Route("api/attributes")]
    [ApiController]
    public class AttributesController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> Query(DataQuery query, CancellationToken cancellationToken)
        {
            var vm = await Mediator.Send(query.ToRequest<GetAttributesQuery>(), cancellationToken);
            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UpsertAttributeRequest request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new UpsertAttributeCommand
            {
                Type = request.Type,
                ObjectType = request.ObjectType,
                Name = request.Name
            }, cancellationToken);
            return Ok(result);
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] UpsertAttributeRequest request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new UpsertAttributeCommand
            {
                Id = id,
                Type = request.Type,
                ObjectType = request.ObjectType,
                Name = request.Name
            }, cancellationToken);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> MarkAsDelete(long id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(ChangeDeletedStatusCommand<Attribute>.Delete(id), cancellationToken);
            return Ok(result);
        }

        [HttpPatch]
        [Route("{id}/restore")]
        public async Task<IActionResult> Restore(long id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(ChangeDeletedStatusCommand<Attribute>.Restore(id), cancellationToken);
            return Ok(result);
        }
    }
}
