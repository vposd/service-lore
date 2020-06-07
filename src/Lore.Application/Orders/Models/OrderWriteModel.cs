using System;
using System.Collections.Generic;
using Lore.Application.Common.Models;

namespace Lore.Application.Orders.Models
{
    public class OrderWriteModel
    {
        public long? Id { get; set; }
        public CustomerModel Customer { get; set; }
        public DeviceWriteModel Device { get; set; }
        public IEnumerable<SimpleEntityModel> Failures { get; set; }
        public IEnumerable<OrderItemWriteModel> Items { get; set; }
        public DateTime DateIn { get; set; }
        public DateTime DateOut { get; set; }
        public string Description { get; set; }
    }

    public class DeviceWriteModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string SerialNumber { get; set; }
        public IEnumerable<AttributeWriteModel> Attributes { get; set; }
    }

    public class AttributeWriteModel
    {
        public long Id { get; set; }
        public long ValueId { get; set; }
    }

    public class OrderItemWriteModel
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Amount { get; set; }
    }
}
