using System.Threading;
using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Common.Commands.ChangeDeletedStatus;
using Lore.Application.Common.Models;
using Lore.Application.ProductGroups.Commands.UpsertProductGroup;
using Lore.Application.ProductGroups.Queries.GetProductGroups;
using Lore.Domain.Entities;
using Lore.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lore.Web.Controllers
{
    [Authorize]
    [Route("api/productGroups")]
    [ApiController]
    public class ProductGroupsController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> Query(DataQuery query, CancellationToken cancellationToken)
        {
            var vm = await Mediator.Send(query.ToRequest<GetProductGroupsQuery>(), cancellationToken);
            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UpsertProductGroupCommand command, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> MarkAsDelete(long id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(ChangeDeletedStatusCommand<ProductGroup>.Delete(id), cancellationToken);
            return Ok(result);
        }

        [HttpPatch]
        [Route("{id}/restore")]
        public async Task<IActionResult> Restore(long id, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(ChangeDeletedStatusCommand<ProductGroup>.Restore(id), cancellationToken);
            return Ok(result);
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] UpsertProductGroupCommand command, CancellationToken cancellationToken)
        {
            var result = await Mediator.Send(new UpsertProductGroupCommand
            {
                Id = id,
                Name = command.Name,
                Deleted = command.Deleted,
                ParentId = command.ParentId
            }, cancellationToken);

            return Ok(result);
        }
    }
}
