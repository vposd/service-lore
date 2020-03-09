using Microsoft.AspNetCore.Mvc;
using Lore.Application.Common.Models;
using Lore.Web.Helpers;

namespace Lore.Web.Models
{
    [ModelBinder(typeof(DataQueryModelBinder))]
    public class DataQuery : QueryRequest
    { }
}
