using System.Collections.Generic;
using System.Linq;

namespace Lore.Application.Common.Models
{
    public class OperationResult
    {
        internal OperationResult(bool succeeded, IEnumerable<string> errors)
        {
            Succeeded = succeeded;
            Errors = errors.ToArray();
        }

        internal OperationResult(long id, bool succeeded)
        {
            EntityId = id;
            Succeeded = succeeded;
        }

        public long EntityId { get; set; }
        public bool Succeeded { get; set; }
        public string[] Errors { get; set; }

        public static OperationResult Success()
            => new OperationResult(true, new string[] { });

        public static OperationResult Success(long entityId)
            => new OperationResult(entityId, true);

        public static OperationResult Failure(IEnumerable<string> errors)
            => new OperationResult(false, errors);
    }
}
