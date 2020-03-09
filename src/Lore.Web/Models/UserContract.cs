using System.Collections.Generic;

namespace Lore.Web.Models
{
    public class UserContract
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public IEnumerable<string> Roles { get; set; }
        public UserEmployee Employee { get; set; }
    }
    public class UserEmployee
    {
        public long EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IEnumerable<UserPosition> Positions { get; set; }
    }

    public class UserPosition
    {
        public long PositionId { get; set; }
        public string Name { get; set; }
    }

}
