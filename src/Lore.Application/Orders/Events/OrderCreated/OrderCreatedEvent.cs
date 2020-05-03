using MediatR;

namespace Lore.Application.Orders.Events.OrderCreated
{
    public class OrderCreatedEvent : INotification
    {
        public long OrderId { get; set; }
    }
}
