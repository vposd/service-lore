using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class OrderState : DeletableEntity
    {
        public string Name { get; set; }
        public string Color { get; set; }
        public int SortOrder { get; set; }
    }
}
