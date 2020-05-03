using MediatR;

namespace Lore.Application.Orders.Commands.UpdateOrderState
{
    public class UpdateOrderStateCommand : IRequest<Unit>
    {
        public long OrderId { get; set; }
        public long StateId { get; set; }
    }
}
