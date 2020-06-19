using System;
using System.Collections.Generic;
using Lore.Application.Common.Models;
using Lore.Application.Orders.Models;
using MediatR;

namespace Lore.Application.Orders.Commands.CreateOrder
{
    public class CreateOrderCommand : IRequest<OperationResult>
    {
        public CustomerModel Customer { get; set; }
        public DeviceCommandModel Device { get; set; }
        public IEnumerable<SimpleEntityModel> Failures { get; set; }
        public IEnumerable<OrderItemCommandModel> Items { get; set; }
        public DateTime DateIn { get; set; }
        public DateTime DateOut { get; set; }
        public string Description { get; set; }
    }

    public class DeviceCommandModel
    {
        public long? Id { get; set; }
        public string Name { get; set; }
        public string SerialNumber { get; set; }
        public IEnumerable<AttributeCommandModel> Attributes { get; set; }
    }

    public class AttributeCommandModel
    {
        public long Id { get; set; }
        public long ValueId { get; set; }
    }

    public class OrderItemCommandModel
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Amount { get; set; }
    }
}
