namespace Lore.Application.Notifications.Models
{
    public class NotificationMessage<T>
    {
        public T Payload { get; }

        public NotificationMessage(T payload)
        {
            Payload = payload;
        }
    }
}
