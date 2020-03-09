using System.Collections.Generic;

namespace Lore.Application.Common.Models
{
    public class ImportOperationResult : OperationResult
    {
        public int RowsCount { get; set; }

        internal ImportOperationResult(bool succeeded, IEnumerable<string> errors, int? rowsCount) : base(succeeded, errors)
        {
            RowsCount = rowsCount ?? 0;
        }

        public static ImportOperationResult Success(int rowsCount)
        {
            return new ImportOperationResult(true, new string[] { }, rowsCount);
        }
    }
}
