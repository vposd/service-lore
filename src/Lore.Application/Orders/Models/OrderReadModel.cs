using System;
using System.Collections.Generic;
using Lore.Application.Common.Models;
using Lore.Domain.Entities;

namespace Lore.Application.Orders.Models
{
    public class OrderReadModel
    {
        public long Id { get; set; }
        public long StatusId { get; set; }
        public CustomerModel Customer { get; set; }
        public DeviceReadModel Device { get; set; }
        public IEnumerable<SimpleEntityModel> Failures { get; set; }
        public IEnumerable<OrderItemReadModel> Items { get; set; }
        public DateTime DateIn { get; set; }
        public DateTime DateOut { get; set; }
        public string Description { get; set; }
    }

    public class CustomerModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
    }

    public class DeviceReadModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string SerialNumber { get; set; }
        public IEnumerable<AttributeReadModel> Attributes { get; set; }
    }

    public class AttributeReadModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public AttributeValueType Type { get; set; }
        public AttributeValueReadModel Value { get; set; }
    }

    public class AttributeValueReadModel
    {
        public long Id { get; set; }
        public string Value { get; set; }
    }

    public class OrderItemReadModel
    {
        public long Id { get; set; }
        public SimpleEntityModel Product { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Amount { get; set; }
    }
}
