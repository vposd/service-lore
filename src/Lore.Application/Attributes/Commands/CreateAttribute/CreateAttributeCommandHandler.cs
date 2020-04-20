using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.Attributes.Commands.CreateAttribute
{
    public class CreateAttributeCommandHandler : IRequestHandler<CreateAttributeCommand, OperationResult>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public CreateAttributeCommandHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<OperationResult> Handle(CreateAttributeCommand request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            context.Attributes.Add(new Attribute
            {
                Name = request.Name,
                Type = request.Type,
            });

            await context.SaveChangesAsync(cancellationToken);

            return OperationResult.Success();
        }
    }
}
