using System.Collections.Generic;

namespace Lore.Application.Employees.Models
{
    public class EmployeesListReadModel
    {
        public IEnumerable<EmployeeReadModel> Employees { get; set; }
    }

    public class EmployeePositionReadModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long Parent { get; set; }
    }

    public class EmployeeReadModel
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IEnumerable<EmployeePositionReadModel> Positions { get; set; }
    }
}
