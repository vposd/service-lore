using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class OrderDeviceFailure : Entity
    {
        public long OrderDeviceId { get; set; }
        public long FailureId { get; set; }

        public OrderDevice OrderDevice { get; set; }
        public Failure Failure { get; set; }
    }
}
