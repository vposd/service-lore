using MediatR;

namespace Lore.Application.Orders.Events
{
    public class OrderCreatedEvent : INotification
    {
        public long OrderId { get; set; }
    }
}
