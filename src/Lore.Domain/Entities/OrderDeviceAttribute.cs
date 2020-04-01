using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class DeviceClassifier : Entity
    {
        public long DeviceId { get; set; }
        public long ClassifierId { get; set; }

        public Device Device { get; set; }
        public Classifier Classifier { get; set; }
    }
}
