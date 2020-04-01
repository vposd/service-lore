using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class Position : DeletableEntity
    {
        public string Name { get; set; }
        public long ParentId { get; set; }
    }
}
