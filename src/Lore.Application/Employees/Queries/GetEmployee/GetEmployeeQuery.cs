using MediatR;
using Lore.Application.Employees.Models;

namespace Lore.Application.Employees.Queries.GetEmployee
{
    public class GetEmployeeQuery : IRequest<EmployeeReadModel>
    {
        public long Id { get; set; }
        public string UserId { get; set; }
    }
}
