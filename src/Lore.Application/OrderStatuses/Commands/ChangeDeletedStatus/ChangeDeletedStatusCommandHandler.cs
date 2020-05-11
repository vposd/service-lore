using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Common;
using Lore.Application.Common.Exceptions;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.OrderStatuses.Commands.ChangeDeletedStatus
{
    public class ChangeDeletedStatusCommandHandler : IRequestHandler<ChangeDeletedStatusCommand<OrderStatus>, OperationResult>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public ChangeDeletedStatusCommandHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<OperationResult> Handle(ChangeDeletedStatusCommand<OrderStatus> command, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var entity = await context.OrderStatuses.FindAsync(command.Id);

            if (entity == null)
            {
                throw new NotFoundException($"Order status with id {command.Id} not found");
            }

            entity.Deleted = command.Deleted;
            await context.SaveChangesAsync(cancellationToken);

            return OperationResult.Success();
        }
    }
}
