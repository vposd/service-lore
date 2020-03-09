using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Common.Interfaces.Services;
using Lore.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lore.Web.Controllers
{
    [Authorize]
    [Route("api/users")]
    [ApiController]
    public class UsersController : BaseController
    {
        private readonly IUserManager userManager;
        private readonly ICurrentUserService currentUser;

        public UsersController(
            IUserManager userManager,
            ICurrentUserService currentUser)
        {
            this.userManager = userManager;
            this.currentUser = currentUser;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserCredentials credentials)
        {
            var result = await userManager.CreateUser(credentials.UserName, credentials.Password);

            if (result.Result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Result.Errors);
        }

        [HttpGet]
        [Route("current")]
        public async Task<IActionResult> GetCurrent()
        {
            var userId = currentUser.UserId;
            var user = await userManager.GetUserById(userId);

            if (user == null)
            {
                return Unauthorized();
            }

            //var employee = await Mediator.Send(new GetEmployeeQuery { UserId = userId });
            //var userEmpoyee = employee == null ?
            //    null :
            //    new UserEmployee
            //    {
            //        EmployeeId = employee.Id,
            //        FirstName = employee.FirstName,
            //        LastName = employee.LastName,
            //        Positions = employee.Positions.Select(x => new UserPosition { PositionId = x.Id, Name = x.Name })
            //    };

            var vm = new UserContract
            {
                UserId = userId,
                UserName = user.UserName,
                Roles = user.Roles,
                //Employee = userEmpoyee
            };

            return Ok(vm);
        }

    }
}
