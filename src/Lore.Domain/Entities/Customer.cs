using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class Customer : DeletableEntity
    {
        public string Name { get; set; }
        public string Phone { get; set; }
    }
}
