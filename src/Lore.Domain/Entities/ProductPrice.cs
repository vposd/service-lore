using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class ProductPrice : DeletableEntity
    {
        public long ProductId { get; set; }
        public decimal Price { get; set; }

        public Product Product { get; set; }
    }
}
