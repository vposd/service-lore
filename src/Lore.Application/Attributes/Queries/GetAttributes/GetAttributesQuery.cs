using Lore.Application.Attributes.Models;
using Lore.Application.Common.Models;
using MediatR;

namespace Lore.Application.Attributes.Queries.GetAttributes
{
    public class GetAttributesQuery : QueryRequest, IRequest<QueryResult<AttributeModel>>
    {
    }
}
