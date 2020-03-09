using System;

namespace Lore.Domain.Common
{
    /// <summary>
    /// Auditable entity contains creation and modification details
    /// </summary>
    public class AuditableEntity : Entity
    {
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? LastModified { get; set; }
        public string LastModifiedBy { get; set; }

    }
}
