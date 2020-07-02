using Lore.Application.Common.Models;
using Lore.Application.Failures.Models;
using MediatR;

namespace Lore.Application.Failures.Queries.GetFailures
{
    public class GetFailuresQuery : QueryRequest, IRequest<QueryResult<FailureModel>>
    {
    }
}
