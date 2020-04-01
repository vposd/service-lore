using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class Employee : DeletableEntity
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}
