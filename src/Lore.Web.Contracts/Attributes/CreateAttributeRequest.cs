using Lore.Domain.Entities;

namespace Lore.Web.Contracts.Attributes
{
    public class CreateAttributeRequest
    {
        public string Name { get; set; }
        public AttributeValueType Type { get; set; }
    }
}
