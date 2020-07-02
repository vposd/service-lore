using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces.Services;
using Lore.Application.Notifications.Models;
using MediatR;

namespace Lore.Application.Orders.Events.OrderProcess
{
    public class OrderProcessEventHandler : INotificationHandler<OrderProcessEvent>
    {
        private readonly INotificationService notificationsService;

        public OrderProcessEventHandler(INotificationService notificationsService)
            => this.notificationsService = notificationsService;

        public async Task Handle(OrderProcessEvent @event, CancellationToken cancellationToken)
            => await notificationsService.SendAsync(new NotificationMessage<OrderProcessEvent>(@event), cancellationToken);
    }
}
