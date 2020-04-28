using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.OrderStates.Commands.UpsertOrderState
{
    public class UpsertOrderStateCommandHandler : IRequestHandler<UpsertOrderStateCommand, OperationResult>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public UpsertOrderStateCommandHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<OperationResult> Handle(UpsertOrderStateCommand command, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var orderState = new OrderState();

            if (command.Id != 0L)
            {
                orderState = await context.OrderStates.FindAsync(command.Id);
            }
            else
            {
                context.OrderStates.Add(orderState);
            }

            orderState.Name = command.Name;
            orderState.SortOrder = command.SortOrder;
            orderState.Color = command.Color;

            await context.SaveChangesAsync(cancellationToken);

            return OperationResult.Success();
        }
    }
}
