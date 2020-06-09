using Lore.Application.Attributes.Models;
using Lore.Application.Common.Models;
using MediatR;

namespace Lore.Application.Attributes.Queries.GetAttributeValues
{
    public class GetAttributeValuesQuery : QueryRequest, IRequest<QueryResult<AttributeValueModel>>
    {
    }
}
