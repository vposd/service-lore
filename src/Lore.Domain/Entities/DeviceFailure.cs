using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class DeviceFailure : Entity
    {
        public long FailureId { get; set; }
        public long OrderId { get; set; }

        public Order Order { get; set; }
        public Failure Failure { get; set; }
    }
}
