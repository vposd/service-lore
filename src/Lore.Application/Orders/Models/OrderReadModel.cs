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
        public OrderDeviceModel OrderDevice { get; set; }
        public IEnumerable<OrderItemModel> Items { get; set; }
        public string Description { get; set; }

        public class CustomerModel
        {
            public long Id { get; set; }
            public string Name { get; set; }
            public string Phone { get; set; }
        }

        public class DeviceModel
        {
            public long Id { get; set; }
            public string Name { get; set; }
            public string SerialNumber { get; set; }
            public IEnumerable<AttributeModel> Attributes { get; set; }
        }

        public class OrderDeviceModel
        {
            public long Id { get; set; }
            public DeviceModel Device { get; set; }
            public IEnumerable<AttributeModel> Attributes { get; set; }
            public IEnumerable<SimpleEntityReadModel> Failures { get; set; }
        }

        public class AttributeModel
        {
            public long Id { get; set; }
            public AttributeValueType Type { get; set; }
            public IEnumerable<AttributeValueModel> Values { get; set; }
        }

        public class AttributeValueModel
        {
            public long Id { get; set; }
            public string Value { get; set; }

        }

        public class OrderItemModel
        {
            public long Id { get; set; }
            public long ProductId { get; set; }
            public int Quantity { get; set; }
            public decimal Amount { get; set; }
        }
    }


}
