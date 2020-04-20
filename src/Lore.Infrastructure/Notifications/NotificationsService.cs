using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces.Services;
using Lore.Application.Notifications.Models;
using Microsoft.AspNetCore.SignalR;

namespace Lore.Infrastructure.Notifications
{
    public class NotificationsService : INotificationService
    {
        private readonly IHubContext<NotificationHub> hubContext;

        public NotificationsService(IHubContext<NotificationHub> hubContext)
            => this.hubContext = hubContext;

        public Task SendAsync<TEvent>(NotificationMessage<TEvent> @event, CancellationToken cancellationToken)
            => hubContext.Clients.All.SendAsync("eventFired", @event, cancellationToken);
    }
}
