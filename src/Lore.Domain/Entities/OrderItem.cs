using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class OrderItem : Entity
    {
        public long ProductId { get; set; }
        public long OrderId { get; set; }
        public int Quantity { get; set; }
        public decimal Amount { get; set; }

        public Order Order { get; set; }
        public Product Product { get; set; }
    }
}
