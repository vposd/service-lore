using FluentValidation;

namespace Lore.Application.Failures.Commands.UpsertFailure
{
    public class UpsertFailureCommandValidator : AbstractValidator<UpsertFailureCommand>
    {
        public UpsertFailureCommandValidator()
        {
            RuleFor(x => x.Name).MaximumLength(50).NotEmpty();
        }
    }
}
