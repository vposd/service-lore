using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class OrderStateHistory : AuditableEntity
    {
        public long OrderId { get; set; }
        public long OrderStateId { get; set; }

        public Order Order { get; set; }
        public OrderState OrderState { get; set; }
    }
}
