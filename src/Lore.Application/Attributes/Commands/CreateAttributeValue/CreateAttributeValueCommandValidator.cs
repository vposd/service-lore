using FluentValidation;
using Lore.Application.Attributes.Commands.CreateAttributeValue;

namespace Lore.Application.OrderStatuses.Commands.UpsertOrderStatus
{
    public class CreateAttributeValueCommandValidator : AbstractValidator<CreateAttributeValueCommand>
    {
        public CreateAttributeValueCommandValidator()
        {
            RuleFor(x => x.Value).MaximumLength(50).NotEmpty();
        }
    }
}
