using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class AttributeValue : DeletableEntity
    {
        public long ClassifierTypeId { get; set; }
        public string Name { get; set; }

        public AttributeType Type { get; set; }
    }
}
