using System.Threading;
using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Clients.Commands.ImportClients;
using Lore.Application.Common.Models;
using Lore.Application.Customers.Queries.GetCustomersQuery;
using Lore.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Lore.Web.Controllers
{
    [Authorize]
    [Route("api/clients")]
    [ApiController]
    public class ClientsController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> Query(DataQuery query)
        {
            var vm = await Mediator.Send(query.ToRequest<GetClientsQuery>());
            return Ok(vm);
        }

        [HttpPost]
        [Route("import")]
        public async Task<IActionResult> Import([FromForm(Name = "file")] IFormFile formFile, CancellationToken cancellationToken)
        {
            var stream = await CheckAndReadFormFileAsync(formFile, cancellationToken);
            var result = await Mediator.Send(new ImportClientsCommand
            {
                Stream = stream
            });

            return Ok(result);
        }
    }
}
