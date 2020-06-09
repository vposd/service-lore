using FluentValidation;
using Lore.Application.Attributes.Commands.UpsertAttribute;

namespace Lore.Application.OrderStatuses.Commands.UpsertOrderStatus
{
    public class UpsertAttributeCommandValidator : AbstractValidator<UpsertAttributeCommand>
    {
        public UpsertAttributeCommandValidator()
        {
            RuleFor(x => x.Name).MaximumLength(50).NotEmpty();
            RuleFor(x => x.ObjectType).NotEmpty();
            RuleFor(x => x.Type).NotEmpty();
        }
    }
}
