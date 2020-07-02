using System;
using System.Collections.Generic;
using Lore.Application.Common.Models;
using MediatR;

namespace Lore.Application.Orders.Commands.UpsertOrder
{
    public class UpsertOrderCommand : IRequest<OperationResult>
    {
        public long? Id { get; set; }
        public CustomerCommandModel Customer { get; set; }
        public DeviceCommandModel Device { get; set; }
        public IEnumerable<ExistingAttributeCommandModel> DeviceAttributes { get; set; }
        public IEnumerable<CreatingAttributeCommandModel> DeviceAttributesToCreate { get; set; }
        public IEnumerable<SimpleEntityCommandModel> Failures { get; set; }
        public IEnumerable<OrderItemCommandModel> Items { get; set; }
        public DateTime DateIn { get; set; }
        public DateTime? DateOut { get; set; }
        public string Description { get; set; }
    }

    public class SimpleEntityCommandModel
    {
        public long? Id { get; set; }
        public string Name { get; set; }
    }

    public class CustomerCommandModel
    {
        public long? Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
    }

    public class DeviceCommandModel
    {
        public long? Id { get; set; }
        public string Name { get; set; }
        public string SerialNumber { get; set; }
        public IEnumerable<ExistingAttributeCommandModel> Attributes { get; set; }
        public IEnumerable<CreatingAttributeCommandModel> AttributesToCreate { get; set; }
    }

    public class ExistingAttributeCommandModel
    {
        public long AttributeId { get; set; }
        public long ValueId { get; set; }
    }

    public class CreatingAttributeCommandModel
    {
        public long AttributeId { get; set; }
        public string Value { get; set; }
    }

    public class OrderItemCommandModel
    {
        public long? Id { get; set; }
        public long ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Amount { get; set; }
    }
}
