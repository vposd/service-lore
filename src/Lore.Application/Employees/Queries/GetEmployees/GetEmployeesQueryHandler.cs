using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Application.Employees.Models;
using MediatR;

namespace Lore.Application.Employees.Queries.GetEmployees
{
    public class GetEmployeeQueryHandler : IRequestHandler<GetEmployeesQuery, QueryResult<EmployeeReadModel>>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public GetEmployeeQueryHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<QueryResult<EmployeeReadModel>> Handle(GetEmployeesQuery request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var vm = new QueryResult<EmployeeReadModel>(0, null);

            return vm;
        }
    }
}
