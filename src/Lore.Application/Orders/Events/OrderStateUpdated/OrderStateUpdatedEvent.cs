using MediatR;

namespace Lore.Application.Orders.Events.OrderStateUpdated
{
    public class OrderStateUpdatedEvent : INotification
    {
        public long OrderId { get; set; }
        public long StateId { get; set; }
    }
}
