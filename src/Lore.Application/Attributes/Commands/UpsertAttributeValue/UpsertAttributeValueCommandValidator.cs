using FluentValidation;

namespace Lore.Application.Attributes.Commands.UpsertAttributeValue
{
    public class UpsertAttributeValueCommandValidator : AbstractValidator<UpsertAttributeValueCommand>
    {
        public UpsertAttributeValueCommandValidator()
        {
            RuleFor(x => x.Value).MaximumLength(50).NotEmpty();
        }
    }
}
