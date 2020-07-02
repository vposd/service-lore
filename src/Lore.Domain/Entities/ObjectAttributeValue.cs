using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class ObjectAttributeValue : DeletableEntity
    {
        public long AttributeId { get; set; }
        public long AttributeValueId { get; set; }

        public Attribute Attribute { get; set; }
        public AttributeValue AttributeValue { get; set; }
        public Device Device { get; set; }
        public Order Order { get; set; }
    }
}
