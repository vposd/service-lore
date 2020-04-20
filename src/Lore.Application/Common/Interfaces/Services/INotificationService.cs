using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Notifications.Models;

namespace Lore.Application.Common.Interfaces.Services
{
    public interface INotificationService
    {
        Task SendAsync<TEvent>(NotificationMessage<TEvent> @event, CancellationToken cancellationToken);
    }
}
