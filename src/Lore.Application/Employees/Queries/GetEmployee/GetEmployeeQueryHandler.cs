using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Employees.Models;
using MediatR;

namespace Lore.Application.Employees.Queries.GetEmployee
{
    public class GetEmployeeQueryHandler : IRequestHandler<GetEmployeeQuery, EmployeeReadModel>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public GetEmployeeQueryHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<EmployeeReadModel> Handle(GetEmployeeQuery request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();
            var vm = new EmployeeReadModel();

            return vm;
        }
    }
}
