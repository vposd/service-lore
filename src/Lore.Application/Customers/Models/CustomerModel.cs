namespace Lore.Application.Customers.Models
{
    public class CustomerModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public bool Deleted { get; set; }
    }
}
