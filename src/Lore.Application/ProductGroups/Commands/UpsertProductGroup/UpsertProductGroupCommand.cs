using Lore.Application.Common.Models;
using MediatR;

namespace Lore.Application.ProductGroups.Commands.UpsertProductGroup
{
    public class UpsertProductGroupCommand : IRequest<OperationResult>
    {
        public long? Id { get; set; }
        public long ParentId { get; set; }
        public string Name { get; set; }
    }
}
