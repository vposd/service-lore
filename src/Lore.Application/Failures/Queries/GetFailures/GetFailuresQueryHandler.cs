using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Extensions.Linq;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Application.Failures.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lore.Application.Failures.Queries.GetFailures
{
    public class GetFailuresQueryHandler : IRequestHandler<GetFailuresQuery, QueryResult<FailureModel>>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public GetFailuresQueryHandler(
            ILoreDbContextFactory contextFactory)
            => this.contextFactory = contextFactory;

        public async Task<QueryResult<FailureModel>> Handle(GetFailuresQuery query, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var results = await context.Failures
               .AsNoTracking()
               .Select(x => new FailureModel
               {
                   Id = x.Id,
                   Name = x.Name,
                   Deleted = x.Deleted
               })
               .ApplyQuery(query, out var count)
               .ToListAsync(cancellationToken);

            return new QueryResult<FailureModel>(count, results);
        }
    }
}
