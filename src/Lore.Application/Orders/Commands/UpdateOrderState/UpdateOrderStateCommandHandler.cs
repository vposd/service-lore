using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Exceptions;
using Lore.Application.Common.Interfaces;
using Lore.Application.Orders.Events.OrderStateUpdated;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.Orders.Commands.UpdateOrderState
{
    internal class UpdateOrderStateCommandHandler : IRequestHandler<UpdateOrderStateCommand, Unit>
    {
        private readonly ILoreDbContextFactory contextFactory;
        private readonly IMediator mediator;

        public UpdateOrderStateCommandHandler(
            ILoreDbContextFactory contextFactory,
            IMediator mediator)
        {
            this.contextFactory = contextFactory;
            this.mediator = mediator;
        }

        public async Task<Unit> Handle(UpdateOrderStateCommand request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var order = await GetOrder(context, request.OrderId);

            order.SetState(request.StateId);

            await context.SaveChangesAsync(cancellationToken);
            await mediator.Publish(new OrderStateUpdatedEvent { OrderId = order.Id, StateId = request.StateId });

            return Unit.Value;
        }

        private async Task<Order> GetOrder(ILoreDbContext context, long orderId)
        {
            var order = await context.Orders.FindAsync(orderId);

            if (order == null)
            {
                throw new NotFoundException("Order not found");
            }

            return order;
        }
    }
}
