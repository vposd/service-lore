using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class OrderDeviceFailure : Entity
    {
        public Order Order { get; set; }
        public Failure Failure { get; set; }
    }
}
