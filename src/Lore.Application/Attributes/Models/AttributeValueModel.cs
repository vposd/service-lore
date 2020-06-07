using Lore.Application.Common.Models;

namespace Lore.Application.Attributes.Models
{
    public class AttributeValueModel
    {
        public long Id { get; set; }
        public SimpleEntityModel Attribute { get; set; }
        public string Value { get; set; }
        public bool IsDefault { get; set; }
        public bool Deleted { get; set; }
    }
}
