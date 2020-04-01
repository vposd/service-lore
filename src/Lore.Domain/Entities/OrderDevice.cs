using System.Collections.Generic;
using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class OrderDevice : Entity
    {
        public OrderDevice()
        {
            Accessories = new HashSet<OrderDeviceAccessory>();
        }

        public string Description { get; set; }
        public long OrderId { get; set; }
        public long DeviceId { get; set; }

        public Order Order { get; set; }
        public Device Device { get; set; }
        public ICollection<OrderDeviceFailure> Failures { get; set; }
        public ICollection<OrderDeviceAccessory> Accessories { get; set; }
    }
}
