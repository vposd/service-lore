using System.Linq;

namespace Lore.Application.Notifications.Models
{
    public class NotificationMessage<T>
    {
        public T Payload { get; }
        public string Type { get; set; }

        public NotificationMessage(T payload)
        {
            Payload = payload;
            Type = typeof(T).ToString().Split('.').LastOrDefault();
        }
    }
}
