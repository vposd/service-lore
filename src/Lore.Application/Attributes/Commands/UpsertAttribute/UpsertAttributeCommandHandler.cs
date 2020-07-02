using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.Attributes.Commands.UpsertAttribute
{
    public class UpsertAttributeCommandHandler : IRequestHandler<UpsertAttributeCommand, OperationResult>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public UpsertAttributeCommandHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<OperationResult> Handle(UpsertAttributeCommand request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var entity = new Attribute();

            if (request.Id.HasValue)
            {
                entity = await context.Attributes.FindAsync(request.Id);
            }
            else
            {
                context.Attributes.Add(entity);
            }

            entity.Name = request.Name;
            entity.Object = request.ObjectType;
            entity.Type = request.Type;

            await context.SaveChangesAsync(cancellationToken);

            return OperationResult.Success();
        }
    }
}
