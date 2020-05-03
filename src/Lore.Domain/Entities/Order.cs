using System;
using System.Collections.Generic;
using Lore.Domain.Common;

namespace Lore.Domain.Entities
{
    public class Order : AuditableEntity
    {
        public Order()
        {
            Items = new HashSet<OrderItem>();
            StateHistory = new HashSet<OrderStatusHistory>();
        }

        public string Description { get; set; }
        public long CustomerId { get; set; }
        public long OrderDeviceId { get; set; }
        public Customer Customer { get; set; }
        public OrderDevice OrderDevice { get; set; }
        public DateTime DateIn { get; set; }
        public DateTime DateOut { get; set; }
        public ICollection<OrderItem> Items { get; set; }
        public ICollection<OrderStatusHistory> StateHistory { get; set; }

        public void AddItems(ICollection<OrderItem> items)
        {
            foreach (var x in items)
            {
                Items.Add(x);
            }
        }

        public void SetState(long stateId)
            => StateHistory.Add(
                new OrderStatusHistory
                {
                    OrderStatusId = stateId
                });
    }
}
