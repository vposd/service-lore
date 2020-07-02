using MediatR;
using Lore.Application.Common.Models;
using Lore.Application.Customers.Models;

namespace Lore.Application.Customers.Queries.GetCustomersQuery
{
    public class GetCustomersQuery : QueryRequest, IRequest<QueryResult<CustomerModel>>
    { }
}
