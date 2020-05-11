using Lore.Application.Common.Models;
using Lore.Domain.Common;
using MediatR;

namespace Lore.Application.Common.Common
{
    public class ChangeDeletedStatusCommand<T> : IRequest<OperationResult>
        where T : DeletableEntity
    {
        public long Id { get; set; }
        public bool Deleted { get; set; }
    }
}
