using System.Collections.Generic;
using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class OrderDevice : Entity
    {
        public OrderDevice()
        {
            OrderDeviceAttributes = new HashSet<ObjectAttributeValue>();
            OrderDeviceFailures = new HashSet<OrderDeviceFailure>();
        }

        public long DeviceId { get; set; }

        public Device Device { get; set; }
        public ICollection<ObjectAttributeValue> OrderDeviceAttributes { get; set; }
        public ICollection<OrderDeviceFailure> OrderDeviceFailures { get; set; }
    }
}
