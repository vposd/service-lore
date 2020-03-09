using System.Collections.Generic;

namespace Lore.Application.Common.Models
{
    public class QueryResult<T>
    {
        public List<T> Results { get; set; }
        public int? Count { get; set; }
    }
}
