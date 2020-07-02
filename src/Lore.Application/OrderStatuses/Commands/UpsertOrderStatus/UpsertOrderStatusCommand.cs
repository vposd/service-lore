using Lore.Application.Common.Models;
using MediatR;

namespace Lore.Application.OrderStatuses.Commands.UpsertOrderStatus
{
    public class UpsertOrderStatusCommand : IRequest<OperationResult>
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int SortOrder { get; set; }
        public string Color { get; set; }
    }
}
