using Lore.Application.Common.Models;
using Lore.Application.ProductGroups.Models;
using MediatR;

namespace Lore.Application.ProductGroups.Queries.GetProductGroups
{
    public class GetProductGroupsQuery : QueryRequest, IRequest<QueryResult<ProductGroupModel>>
    {
    }
}
