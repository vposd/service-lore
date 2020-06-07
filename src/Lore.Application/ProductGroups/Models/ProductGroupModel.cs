using Lore.Application.Common.Models;

namespace Lore.Application.ProductGroups.Models
{
    public class ProductGroupModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public SimpleEntityModel Parent { get; set; }
        public bool Deleted { get; set; }
    }
}
