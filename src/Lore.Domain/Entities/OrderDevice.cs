using System.Collections.Generic;
using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class OrderDevice : Entity
    {
        public OrderDevice()
        {
            OrderDeviceAttributes = new HashSet<OrderDeviceAttribute>();
        }

        public string Description { get; set; }
        public long DeviceId { get; set; }

        public Device Device { get; set; }
        public ICollection<OrderDeviceAttribute> OrderDeviceAttributes { get; set; }
    }
}
