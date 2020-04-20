using System.Collections.Generic;
using System.Linq;
using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class Order : AuditableEntity
    {
        public Order()
        {
            Items = new HashSet<OrderItem>();
            StateHistory = new HashSet<OrderStateHistory>();
        }

        public string Description { get; set; }
        public long CustomerId { get; set; }
        public long OrderDeviceId { get; set; }

        public Customer Customer { get; set; }
        public OrderDevice OrderDevice { get; set; }
        public ICollection<OrderItem> Items { get; set; }
        public ICollection<OrderStateHistory> StateHistory { get; set; }

        public void AddItems(ICollection<OrderItem> items)
        {
            foreach (var x in items)
            {
                Items.Add(x);
            }
        }

        public void SetState(long stateId)
            => StateHistory.Add(
                new OrderStateHistory
                {
                    StateId = stateId
                });

        public OrderState GetActiveState()
            => StateHistory
                .OrderBy(x => x.Created)
                .LastOrDefault()?.OrderState;
    }
}
