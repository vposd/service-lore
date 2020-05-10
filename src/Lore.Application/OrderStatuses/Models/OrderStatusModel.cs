namespace Lore.Application.OrderStatuses.Models
{
    public class OrderStatusModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public bool Deleted { get; set; }
        public int SortOrder { get; set; }
        public int IsDefault { get; set; }
        public int IsFinal { get; set; }
    }
}
