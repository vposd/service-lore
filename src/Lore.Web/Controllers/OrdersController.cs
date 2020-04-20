﻿using System.Threading.Tasks;
using Lore.Api.Controllers;
using Lore.Application.Common.Models;
using Lore.Application.Employees.Queries.GetEmployee;
using Lore.Application.Orders.Commands.CreateOrder;
using Lore.Application.Orders.Queries.GetOrders;
using Lore.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lore.Web.Controllers
{
    [Authorize]
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> Query(DataQuery query)
        {
            var vm = await Mediator.Send(query.ToRequest<GetOrdersQuery>());
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
        public async Task<IActionResult> Create([FromBody] CreateOrderCommand command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }
    }
}
