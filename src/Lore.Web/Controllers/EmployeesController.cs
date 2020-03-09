using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Lore.Api.Controllers;
using Lore.Application.Common.Models;
using Lore.Application.Employees.Commands.UpsertEmployee;
using Lore.Application.Employees.Queries.GetEmployee;
using Lore.Application.Employees.Queries.GetEmployees;
using Lore.Web.Models;

namespace Lore.Web.Controllers
{
    [Authorize]
    [Route("api/employees")]
    [ApiController]
    public class EmployeesController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> Query(DataQuery query)
        {
            var vm = await Mediator.Send(query.ToRequest<GetEmployeesQuery>());
            return Ok(vm);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var vm = await Mediator.Send(new GetEmployeeQuery { Id = id });
            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UpsertEmployeeCommand command)
        {
            await Mediator.Send(command);
            return Ok();
        }
    }
}
