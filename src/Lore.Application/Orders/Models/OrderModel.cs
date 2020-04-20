using System.Collections.Generic;

namespace Lore.Application.Orders.Models
{
    public class OrderModel
    {
        public string Description { get; set; }
        public CustomerModel Customer { get; set; }
        public OrderDeviceModel OrderDevice { get; set; }
        public ICollection<OrderItemModel> Items { get; set; }
    }

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
    }

    public class OrderDeviceModel
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public DeviceModel Device { get; set; }
        public ICollection<DeviceAttributeModel> Attributes { get; set; }
    }

    public class DeviceAttributeModel
    {
        public long Id { get; set; }
        public long ValueId { get; set; }
    }

    public class OrderItemModel
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Amount { get; set; }
    }
}
