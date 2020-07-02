using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Attributes.Models;
using Lore.Application.Common.Extensions.Linq;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lore.Application.Attributes.Queries.GetAttributeValues
{
    public class GetAttributeValuesQueryHandler : IRequestHandler<GetAttributeValuesQuery, QueryResult<AttributeValueModel>>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public GetAttributeValuesQueryHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<QueryResult<AttributeValueModel>> Handle(GetAttributeValuesQuery request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var results = await context.AttributesValues
                .AsNoTracking()
                .Select(v => new AttributeValueModel
                {
                    Id = v.Id,
                    Attribute = new SimpleEntityModel { Id = v.Attribute.Id, Name = v.Attribute.Name },
                    Deleted = v.Deleted,
                    Value = v.Value,
                    IsDefault = v.IsDefault
                })
                .ApplyQuery(request, out var count)
                .ToListAsync(cancellationToken);

            return new QueryResult<AttributeValueModel>(count, results);
        }
    }
}
