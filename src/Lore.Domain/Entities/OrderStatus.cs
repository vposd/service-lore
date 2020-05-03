using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class OrderStatus : DeletableEntity
    {
        public string Name { get; set; }
        public string Color { get; set; }
        public int SortOrder { get; set; }
        public int IsDefault { get; set; } = 0;
        public int isFinal { get; set; } = 0;
    }
}
