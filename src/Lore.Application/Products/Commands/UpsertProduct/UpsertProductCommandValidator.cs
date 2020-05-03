using FluentValidation;
using Lore.Application.ProductGroups.Commands.UpsertProduct;

namespace Lore.Application.OrderStatuses.Commands.UpsertProduct
{
    public class UpsertProductCommandValidator : AbstractValidator<UpsertProductCommand>
    {
        public UpsertProductCommandValidator()
        {
            RuleFor(x => x.Name).MaximumLength(50).NotEmpty();
            RuleFor(x => x.GroupId).GreaterThan(0L).NotEmpty();
            RuleFor(x => x.Price).GreaterThan(0).NotEmpty();
        }

    }
}
