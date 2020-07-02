using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.OrderStatuses.Commands.UpsertOrderStatus
{
    public class UpsertOrderStatusCommandHandler : IRequestHandler<UpsertOrderStatusCommand, OperationResult>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public UpsertOrderStatusCommandHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<OperationResult> Handle(UpsertOrderStatusCommand command, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var orderState = new OrderStatus();

            if (command.Id != 0L)
            {
                orderState = await context.OrderStatuses.FindAsync(command.Id);
            }
            else
            {
                context.OrderStatuses.Add(orderState);
            }

            orderState.Name = command.Name;
            orderState.SortOrder = command.SortOrder;
            orderState.Color = command.Color;

            await context.SaveChangesAsync(cancellationToken);

            return OperationResult.Success();
        }
    }
}
