using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class ProductGroup : DeletableEntity
    {
        public long ParentId { get; set; }
        public string Name { get; set; }
    }
}
