using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class OrderDeviceAccessory : Entity
    {
        public long OrderDeviceId { get; set; }
        public long AccessoryId { get; set; }

        public OrderDevice OrderDevice { get; set; }
        public Accessory Accessory { get; set; }
    }
}
