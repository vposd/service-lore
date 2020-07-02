using Lore.Application.Common.Models;
using Lore.Application.Failures.Models;
using MediatR;

namespace Lore.Application.Failures.Commands.UpsertFailure
{
    public class UpsertFailureCommand : FailureModel, IRequest<OperationResult>
    {
    }
}
