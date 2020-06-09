using Lore.Domain.Entities;

namespace Lore.Web.Contracts.Attributes
{
    public class UpsertAttributeRequest
    {
        public string Name { get; set; }
        public AttributeValueType Type { get; set; }
        public AttributeObject ObjectType { get; set; }
    }
}
