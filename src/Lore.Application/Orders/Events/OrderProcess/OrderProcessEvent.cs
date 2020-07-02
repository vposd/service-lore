using Lore.Application.Common.Enumerators;
using MediatR;

namespace Lore.Application.Orders.Events.OrderProcess
{
    public class OrderProcessEvent : INotification
    {
        public long OrderId { get; set; }
        public ProcessOperation Operation { get; set; }
    }
}
