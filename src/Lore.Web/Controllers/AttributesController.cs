using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Attributes.Commands.CreateAttribute;
using Lore.Application.Attributes.Commands.CreateAttributeValue;
using Lore.Application.Attributes.Queries.GetAttributes;
using Lore.Application.Common.Models;
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
        public async Task<IActionResult> Query(DataQuery query)
        {
            var vm = await Mediator.Send(query.ToRequest<GetAttributesQuery>());
            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateAttributeRequest request)
        {
            var result = await Mediator.Send(new CreateAttributeCommand
            {
                Type = request.Type,
                Name = request.Name
            });
            return Ok(result);
        }

        [HttpPost]
        [Route("{attributeId}/values")]
        public async Task<IActionResult> Create(long attributeId, [FromBody] CreateAttributeValueRequest request)
        {
            var result = await Mediator.Send(new CreateAttributeValueCommand
            {
                AttributeId = attributeId,
                IsDefault = request.IsDefault,
                Value = request.Value,
            });

            return Ok(result);
        }
    }
}
