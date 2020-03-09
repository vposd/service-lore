using MediatR;
using Lore.Application.Common.Models;
using Lore.Application.Employees.Models;

namespace Lore.Application.Employees.Queries.GetEmployees
{
    public class GetEmployeesQuery : QueryRequest, IRequest<QueryResult<EmployeeReadModel>>
    { }
}
