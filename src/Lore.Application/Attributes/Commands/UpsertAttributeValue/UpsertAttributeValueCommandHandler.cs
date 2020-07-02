using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.Attributes.Commands.UpsertAttributeValue
{
    public class UpsertAttributeValueCommandHandler : IRequestHandler<UpsertAttributeValueCommand, OperationResult>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public UpsertAttributeValueCommandHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<OperationResult> Handle(UpsertAttributeValueCommand request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            if (request.IsDefault)
                ResetDefaultAttributeValue(context);

            var entity = new AttributeValue();

            if (request.Id.HasValue)
                entity = await context.AttributesValues.FindAsync(request.Id);
            else
                context.AttributesValues.Add(entity);

            entity.AttributeId = request.AttributeId;
            entity.IsDefault = request.IsDefault;
            entity.Value = request.Value;

            await context.SaveChangesAsync(cancellationToken);

            return OperationResult.Success();
        }

        private void ResetDefaultAttributeValue(ILoreDbContext context)
        {
            var defaultValue = context.AttributesValues.Where(x => x.IsDefault).FirstOrDefault();
            if (defaultValue != null)
            {
                defaultValue.IsDefault = false;
            }
        }
    }
}
