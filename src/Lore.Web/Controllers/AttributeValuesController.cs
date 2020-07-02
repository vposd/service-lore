using System.Threading;
using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Attributes.Commands.UpsertAttributeValue;
using Lore.Application.Attributes.Queries.GetAttributeValues;
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
    [Route("api/attributes/values")]
    [ApiController]
    public class AttributeValuesController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> Query(DataQuery query, CancellationToken cancellationToken)
        {
            var request = query.ToRequest<GetAttributeValuesQuery>();

            var vm = await Mediator.Send(request, cancellationToken);
            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UpsertAttributeValueRequest request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new UpsertAttributeValueCommand
            {
                AttributeId = request.AttributeId,
                IsDefault = request.IsDefault,
                Value = request.Value,
            }, cancellationToken);

            return Ok(result);
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] UpsertAttributeValueRequest request, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new UpsertAttributeValueCommand
            {
                Id = id,
                AttributeId = request.AttributeId,
                IsDefault = request.IsDefault,
                Value = request.Value,
            }, cancellationToken);

            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> MarkAsDelete(long id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(ChangeDeletedStatusCommand<AttributeValue>.Delete(id), cancellationToken);
            return Ok(result);
        }

        [HttpPatch]
        [Route("{id}/restore")]
        public async Task<IActionResult> Restore(long id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(ChangeDeletedStatusCommand<AttributeValue>.Restore(id), cancellationToken);
            return Ok(result);
        }


    }
}
