using System.Collections.Generic;
using Lore.Domain.Entities;

namespace Lore.Application.Attributes.Models
{
    public class AttributeModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool Deleted { get; set; }
        public AttributeValueType Type { get; set; }
        public AttributeObject ObjectType { get; set; }
        public IEnumerable<AttributeValueModel> Values { get; set; }
    }
}
