using Lore.Application.Common.Models;
using MediatR;

namespace Lore.Application.Common.Commands.ChangeDeletedStatus
{
    public class ChangeDeletedStatusCommand<T> : IChangeDeletedStatus, IRequest<OperationResult>
    {
        public long Id { get; set; }
        public bool Deleted { get; set; }

        public static ChangeDeletedStatusCommand<T> Delete(long id)
            => new ChangeDeletedStatusCommand<T>
            {
                Id = id,
                Deleted = true
            };

        public static ChangeDeletedStatusCommand<T> Restore(long id)
            => new ChangeDeletedStatusCommand<T>
            {
                Id = id,
                Deleted = false
            };
    }
}
