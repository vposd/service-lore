using FluentValidation;
using Lore.Application.Attributes.Commands.CreateAttributeValue;

namespace Lore.Application.OrderStates.Commands.UpsertOrderState
{
    public class CreateAttributeValueCommandValidator : AbstractValidator<CreateAttributeValueCommand>
    {
        public CreateAttributeValueCommandValidator()
        {
            RuleFor(x => x.AttributeId).NotEmpty();
            RuleFor(x => x.Value).MaximumLength(50).NotEmpty();
        }
    }
}
