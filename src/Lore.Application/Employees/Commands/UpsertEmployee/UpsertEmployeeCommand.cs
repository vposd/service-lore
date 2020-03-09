using MediatR;

namespace Lore.Application.Employees.Commands.UpsertEmployee
{
    public class UpsertEmployeeCommand : IRequest<long>
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
    }
}
