using Lore.Application.Common.Models;
using Lore.Application.Products.Models;
using MediatR;

namespace Lore.Application.Products.Queries.GetProducts
{
    public class GetProductsQuery : QueryRequest, IRequest<QueryResult<ProductModel>>
    {
    }
}
