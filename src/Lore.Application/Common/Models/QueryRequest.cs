using System.Collections.Generic;

namespace Lore.Application.Common.Models
{
    public class QueryRequest
    {
        public uint? Take { get; set; }
        public uint? Skip { get; set; }

        /// <summary>
        /// Sort filter string in format "property asc/desc"
        /// Example: "name desc"
        /// </summary>
        public string Sort { get; set; }

        /// <summary>
        /// Filter string in OData querying data filter
        /// Example: "name eq 'One"
        /// </summary>
        public string Filter { get; set; }

        /// <summary>
        /// Search query
        /// </summary>
        public string Search { get; set; }

        /// <summary>
        /// Columns list
        /// </summary>
        public List<string> SearchColumns { get; set; }
    }

    public static class RequestQueryExtensions
    {
        public static U ToRequest<U>(this QueryRequest query)
        where U : QueryRequest, new()
        {
            return new U
            {
                Take = query.Take,
                    Skip = query.Skip,
                    Filter = query.Filter,
                    Sort = query.Sort,
                    Search = query.Search,
                    SearchColumns = query.SearchColumns
            };
        }

        public static U FromQuery<U>(this QueryRequest query)
        where U : QueryRequest, new()
        {
            return new U
            {
                Take = query.Take,
                    Skip = query.Skip,
                    Filter = query.Filter,
                    Sort = query.Sort,
                    Search = query.Search,
                    SearchColumns = query.SearchColumns
            };
        }
    }
}
