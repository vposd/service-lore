using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Extensions.Linq;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Application.Customers.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lore.Application.Customers.Queries.GetCustomersQuery
{
    public class GetCustomersQueryHandler : IRequestHandler<GetCustomersQuery, QueryResult<CustomerModel>>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public GetCustomersQueryHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<QueryResult<CustomerModel>> Handle(GetCustomersQuery query, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var results = await context.Customers
                .Select(x => new CustomerModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Phone = x.Phone,
                    Deleted = x.Deleted
                })
                .ApplyQuery(query, out var count)
                .ToListAsync(cancellationToken);

            return new QueryResult<CustomerModel>(count, results);
        }
    }
}
