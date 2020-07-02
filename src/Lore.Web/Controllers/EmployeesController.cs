using System.Threading;
using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Common.Models;
using Lore.Application.Employees.Commands.UpsertEmployee;
using Lore.Application.Employees.Queries.GetEmployee;
using Lore.Application.Employees.Queries.GetEmployees;
using Lore.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lore.Web.Controllers
{
    [Authorize]
    [Route("api/employees")]
    [ApiController]
    public class EmployeesController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> Query(DataQuery query, CancellationToken cancellationToken)
        {
            var vm = await Mediator.Send(query.ToRequest<GetEmployeesQuery>(), cancellationToken);
            return Ok(vm);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(long id, CancellationToken cancellationToken)
        {
            var vm = await Mediator.Send(new GetEmployeeQuery { Id = id }, cancellationToken);
            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UpsertEmployeeCommand command, CancellationToken cancellationToken)
        {
            await Mediator.Send(command, cancellationToken);
            return Ok();
        }
    }
}
