using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Attributes.Models;
using Lore.Application.Common.Extensions.Linq;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lore.Application.Attributes.Queries.GetAttributes
{
    public class GetAttributesQueryHandler : IRequestHandler<GetAttributesQuery, QueryResult<AttributeModel>>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public GetAttributesQueryHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<QueryResult<AttributeModel>> Handle(GetAttributesQuery request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var results = await context.Attributes
                .AsNoTracking()
                .Where(x => x.Deleted == 0)
                .Select(x => new AttributeModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Type = x.Type,
                    Values = x.Values.Select(v => new AttributeValueModel
                    {
                        Id = v.Id,
                        IsDefault = v.IsDefault,
                        AttributeId = x.Id,
                        Value = v.Value
                    })
                })
                .ApplyQuery(request, out var count)
                .ToListAsync(cancellationToken);

            return new QueryResult<AttributeModel>
            {
                Results = results,
                Count = count
            };
        }
    }
}
