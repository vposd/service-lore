using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Exceptions;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Domain.Common;
using MediatR;

namespace Lore.Application.Common.Commands.ChangeDeletedStatus
{
    public class ChangeDeletedStatusCommandHandler<T> : IRequestHandler<ChangeDeletedStatusCommand<T>, OperationResult>
        where T : DeletableEntity
    {
        private readonly ILoreDbContextFactory contextFactory;

        public ChangeDeletedStatusCommandHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<OperationResult> Handle(ChangeDeletedStatusCommand<T> command, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var entity = await context.Set<T>().FindAsync(command.Id);

            if (entity == null)
            {
                throw new NotFoundException($"${typeof(T).Name} with id {command.Id} not found");
            }

            entity.Deleted = command.Deleted;
            await context.SaveChangesAsync(cancellationToken);

            return OperationResult.Success();
        }
    }
}
