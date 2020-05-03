using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class Product : DeletableEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public long ProductGroupId { get; set; }

        public ProductGroup ProductGroup { get; set; }
    }
}
