using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.Employees.Commands.UpsertEmployee
{
    public class UpsertEmployeeCommandHandler : IRequestHandler<UpsertEmployeeCommand, long>
    {

        private readonly ILoreDbContextFactory contextFactory;

        public UpsertEmployeeCommandHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<long> Handle(UpsertEmployeeCommand request, CancellationToken cancellationToken)
        {
            Employee entity;
            using var context = contextFactory.Create();
            if (request.Id > 0)
            {
                entity = await context.Employees.FindAsync(request.Id);
            }
            else
            {
                entity = new Employee();
                context.Employees.Add(entity);
            }

            entity.UserId = request.UserId;
            entity.FirstName = request.FirstName;
            entity.LastName = request.LastName;

            await context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
