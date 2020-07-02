using System;
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
            DeviceFailures = new HashSet<DeviceFailure>();
            DeviceAttributes = new HashSet<ObjectAttributeValue>();
            StateHistory = new HashSet<OrderStatusHistory>();
        }

        public string Description { get; set; }
        public long CustomerId { get; set; }
        public long DeviceId { get; set; }
        public Customer Customer { get; set; }
        public Device Device { get; set; }
        public ICollection<DeviceFailure> DeviceFailures { get; set; }
        public ICollection<ObjectAttributeValue> DeviceAttributes { get; set; }
        public ICollection<OrderItem> Items { get; set; }
        public ICollection<OrderStatusHistory> StateHistory { get; set; }
        public DateTime DateIn { get; set; }
        public DateTime DateOut { get; set; }

        public void UpsertItems(ICollection<OrderItem> existing, ICollection<OrderItem> creating)
        {
            var list = existing.ToDictionary(x => x.ProductId);

            foreach (var item in Items)
            {
                var found = list[item.ProductId];
                if (found != null)
                {
                    item.Quantity = found.Quantity;
                    item.Amount = found.Amount;
                    continue;
                }
                Items.Remove(item);
            }

            foreach (var item in creating)
            {
                Items.Add(item);
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
