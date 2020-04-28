using FluentValidation;
using Lore.Application.ProductGroups.Commands.UpsertProductGroup;

namespace Lore.Application.OrderStates.Commands.UpsertOrderState
{
    public class UpsertProductGroupCommandValidator : AbstractValidator<UpsertProductGroupCommand>
    {
        public UpsertProductGroupCommandValidator()
        {
            RuleFor(x => x.Name).MaximumLength(50).NotEmpty();
            RuleFor(x => x.ParentId).NotEmpty();
            RuleFor(x => x).Must(x => x.Id.HasValue ? x.Id != x.ParentId : true).WithMessage("Group cant be parent with itself");
        }

    }
}
