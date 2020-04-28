namespace Lore.Application.Orders.Models
{
    public class OrderQueryModel
    {
        public long Id { get; set; }
        public long StatusId { get; set; }
        public string Description { get; set; }
        public long CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string OrderDeviceName { get; set; }
        public string OrderDeviceDescription { get; set; }
    }
}
