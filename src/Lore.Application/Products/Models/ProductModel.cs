using Lore.Application.Common.Models;

namespace Lore.Application.Products.Models
{
    public class ProductModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool Deleted { get; set; }
        public SimpleEntityModel Group { get; set; }
    }
}
