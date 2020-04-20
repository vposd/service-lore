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

        public async Task<OperationResult> Handle(UpsertOrderStateCommand request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var orderState = new OrderState();

            if (request.Id != 0L)
            {
                orderState = await context.OrderStates.FindAsync(request.Id);
            }
            else
            {
                context.OrderStates.Add(orderState);
            }

            orderState.Name = request.Name;
            orderState.SortOrder = request.SortOrder;
            orderState.Color = request.Color;

            await context.SaveChangesAsync(cancellationToken);

            return OperationResult.Success();
        }
    }
}
