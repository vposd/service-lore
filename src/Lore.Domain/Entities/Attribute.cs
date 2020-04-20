﻿using System.Collections.Generic;
using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public enum AttributeValueType
    {
        ListSingleValue = 2,
        ListMultipleValue = 3,
    }

    public class Attribute : DeletableEntity
    {
        public Attribute()
        {
            Values = new HashSet<AttributeValue>();
        }

        public string Name { get; set; }
        public AttributeValueType Type { get; set; }
        public ICollection<AttributeValue> Values { get; set; }
    }
}
