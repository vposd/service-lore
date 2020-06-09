namespace Lore.Web.Contracts.Attributes
{
    public class UpsertAttributeValueRequest
    {
        public long AttributeId { get; set; }
        public string Value { get; set; }
        public bool IsDefault { get; set; }
    }
}
