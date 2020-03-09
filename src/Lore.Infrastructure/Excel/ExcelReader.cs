using System.IO;
using Lore.Application.Interfaces.Services;
using Npoi.Mapper;

namespace Lore.Infrastructure.Excel
{
    public class ExcelReader : IExcelReader
    {
        public Mapper GetMapperFrom(MemoryStream stream) => new Mapper(stream);
    }
}
