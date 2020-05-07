using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class AttributeValue : DeletableEntity
    {
        public string Value { get; set; }
        public bool IsDefault { get; set; } = false;
        public long AttributeId { get; set; }

        public Attribute Attribute { get; set; }
    }
}
