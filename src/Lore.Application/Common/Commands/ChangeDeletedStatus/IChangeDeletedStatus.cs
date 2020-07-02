using Lore.Application.Common.Models;
using MediatR;

namespace Lore.Application.Common.Commands.ChangeDeletedStatus
{

    public interface IChangeDeletedStatus : IRequest<OperationResult>
    {
        long Id { get; set; }
        public bool Deleted { get; set; }
    }
}
