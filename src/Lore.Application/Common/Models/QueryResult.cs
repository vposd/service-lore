using System.Collections.Generic;

namespace Lore.Application.Common.Models
{
    public class QueryResult<T>
    {
        public List<T> Results { get; set; }
        public int? Count { get; set; }

        public QueryResult(int count, List<T> results)
        {
            Count = count;
            Results = results;
        }
    }
}
