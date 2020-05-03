using Lore.Application.Common.Models;
using Lore.Application.Orders.Models;
using MediatR;

namespace Lore.Application.Orders.Commands.CreateOrder
{
    public class CreateOrderCommand : OrderWriteModel, IRequest<OperationResult>
    {
    }
}
