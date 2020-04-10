using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class OrderDeviceAttribute : Entity
    {
        public long OrderDeviceId { get; set; }
        public long AttributeValueId { get; set; }

        public OrderDevice OrderDevice { get; set; }
        public AttributeValue AttributeValue { get; set; }
    }
}
