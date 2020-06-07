using Lore.Application.Common.Models;
using MediatR;

namespace Lore.Application.Common.Commands.ChangeDeletedStatus
{
    public class ChangeDeletedStatusCommand<T> : IChangeDeletedStatus, IRequest<OperationResult>
    {
        public long Id { get; set; }
        public bool Deleted { get; set; }
    }
}
