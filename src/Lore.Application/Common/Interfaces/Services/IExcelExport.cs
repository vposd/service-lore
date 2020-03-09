using System.Collections.Generic;

namespace Lore.Application.Common.Interfaces.Services
{
    public interface IExcelExport
    {
        byte[] Export<T>(List<T> exportData, string sheetName = "01");
    }
}
