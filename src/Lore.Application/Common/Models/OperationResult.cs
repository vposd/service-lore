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

        public bool Succeeded { get; set; }

        public string[] Errors { get; set; }

        public static OperationResult Success()
        {
            return new OperationResult(true, new string[] { });
        }

        public static OperationResult Failure(IEnumerable<string> errors)
        {
            return new OperationResult(false, errors);
        }
    }
}
