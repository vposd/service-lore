namespace Lore.Application.Attributes.Models
{
    public class AttributeValueModel
    {
        public long Id { get; set; }
        public long AttributeId { get; set; }
        public string Value { get; set; }
        public bool IsDefault { get; set; }
    }
}
