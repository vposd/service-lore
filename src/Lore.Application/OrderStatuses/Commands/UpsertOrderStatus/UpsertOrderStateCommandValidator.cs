using FluentValidation;

namespace Lore.Application.OrderStatuses.Commands.UpsertOrderState
{
    public class UpsertOrderStateCommandValidator : AbstractValidator<UpsertOrderStateCommand>
    {
        public UpsertOrderStateCommandValidator()
        {
            RuleFor(x => x.Name).MaximumLength(50).NotEmpty();
            RuleFor(x => x.Color).MaximumLength(7).NotEmpty();
        }

    }
}
