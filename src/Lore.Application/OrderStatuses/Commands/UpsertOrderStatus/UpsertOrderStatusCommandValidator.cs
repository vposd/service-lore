using FluentValidation;

namespace Lore.Application.OrderStatuses.Commands.UpsertOrderStatus
{
    public class UpsertOrderStatusCommandValidator : AbstractValidator<UpsertOrderStatusCommand>
    {
        public UpsertOrderStatusCommandValidator()
        {
            RuleFor(x => x.Name).MaximumLength(50).NotEmpty();
            RuleFor(x => x.Color).MaximumLength(7).NotEmpty();
        }

    }
}
