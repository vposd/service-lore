using System.Collections.Generic;
using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class ProductGroup : DeletableEntity
    {
        public ProductGroup()
        {
            Products = new HashSet<Product>();
        }

        public long ParentId { get; set; }
        public string Name { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
