using System.IO;
using Npoi.Mapper;

namespace Lore.Application.Interfaces.Services
{
    public interface IExcelReader
    {
        Mapper GetMapperFrom(MemoryStream stream);
    }
}
