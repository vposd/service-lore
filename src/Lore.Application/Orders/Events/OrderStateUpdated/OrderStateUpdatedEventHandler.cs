using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces.Services;
using Lore.Application.Notifications.Models;
using MediatR;

namespace Lore.Application.Orders.Events.OrderStateUpdated
{
    public class OrderStateUpdatedEventHandler : INotificationHandler<OrderStateUpdatedEvent>
    {
        private readonly INotificationService notificationsService;

        public OrderStateUpdatedEventHandler(INotificationService notificationsService)
            => this.notificationsService = notificationsService;

        public async Task Handle(OrderStateUpdatedEvent @event, CancellationToken cancellationToken)
            => await notificationsService.SendAsync(new NotificationMessage<OrderStateUpdatedEvent>(@event), cancellationToken);
    }
}
