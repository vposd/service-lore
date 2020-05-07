using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.Failures.Commands.UpsertFailure
{
    public class UpsertFailureCommandHandler : IRequestHandler<UpsertFailureCommand, OperationResult>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public UpsertFailureCommandHandler(
            ILoreDbContextFactory contextFactory)
            => this.contextFactory = contextFactory;

        public async Task<OperationResult> Handle(UpsertFailureCommand request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var failure = new Failure();

            if (request.Id.HasValue)
            {
                failure = await context.Failures.FindAsync(request.Id);
            }
            else
            {
                context.Failures.Add(failure);
            }

            failure.Name = request.Name;
            failure.Deleted = request.Deleted;

            await context.SaveChangesAsync(cancellationToken);

            return OperationResult.Success();
        }
    }
}
