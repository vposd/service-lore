using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class OrderStatusHistory : AuditableEntity
    {
        public long OrderId { get; set; }
        public long OrderStatusId { get; set; }

        public Order Order { get; set; }
        public OrderStatus OrderStatus { get; set; }
    }
}
