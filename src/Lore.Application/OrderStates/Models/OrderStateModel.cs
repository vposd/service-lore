namespace Lore.Application.OrderStates.Models
{
    public class OrderStateModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public int IsDefault { get; set; }
    }
}
