using System.Collections.Generic;
using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class Device : Entity
    {
        public Device()
        {
            Attributes = new HashSet<ObjectAttributeValue>();
        }

        public string SerialNumber { get; set; }
        public string Name { get; set; }

        public ICollection<ObjectAttributeValue> Attributes { get; set; }
    }
}
