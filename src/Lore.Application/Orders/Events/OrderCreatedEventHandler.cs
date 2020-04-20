using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces.Services;
using Lore.Application.Notifications.Models;
using MediatR;

namespace Lore.Application.Orders.Events
{
    public class OrderCreatedEventHandler : INotificationHandler<OrderCreatedEvent>
    {
        private readonly INotificationService notificationsService;

        public OrderCreatedEventHandler(INotificationService notificationsService)
            => this.notificationsService = notificationsService;

        public async Task Handle(OrderCreatedEvent @event, CancellationToken cancellationToken)
            => await notificationsService.SendAsync(new NotificationMessage<OrderCreatedEvent>(@event), cancellationToken);
    }
}
