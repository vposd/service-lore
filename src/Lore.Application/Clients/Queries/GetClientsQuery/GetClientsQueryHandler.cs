using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Application.Customers.Models;
using MediatR;

namespace Lore.Application.Customers.Queries.GetCustomersQuery
{
    public class GetClientsQueryHandler : IRequestHandler<GetClientsQuery, QueryResult<ClientReadModel>>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public GetClientsQueryHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<QueryResult<ClientReadModel>> Handle(GetClientsQuery request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var vm = new QueryResult<ClientReadModel>();

            return vm;
        }
    }
}
