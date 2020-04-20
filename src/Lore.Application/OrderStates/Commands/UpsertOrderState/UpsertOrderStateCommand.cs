using Lore.Application.Common.Models;
using MediatR;

namespace Lore.Application.OrderStates.Commands.UpsertOrderState
{
    public class UpsertOrderStateCommand : IRequest<OperationResult>
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int SortOrder { get; set; }
        public string Color { get; set; }
    }
}
