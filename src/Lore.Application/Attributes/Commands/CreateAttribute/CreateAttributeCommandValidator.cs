using FluentValidation;
using Lore.Application.Attributes.Commands.CreateAttribute;

namespace Lore.Application.OrderStatuses.Commands.UpsertOrderStatus
{
    public class CreateAttributeCommandValidator : AbstractValidator<CreateAttributeCommand>
    {
        public CreateAttributeCommandValidator()
        {
            RuleFor(x => x.Name).MaximumLength(50).NotEmpty();
            RuleFor(x => x.ObjectType).NotEmpty();
            RuleFor(x => x.Type).NotEmpty();
        }
    }
}
