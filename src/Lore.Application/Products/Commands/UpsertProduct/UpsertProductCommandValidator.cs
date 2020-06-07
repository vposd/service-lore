using FluentValidation;

namespace Lore.Application.Products.Commands.UpsertProduct
{
    public class UpsertProductCommandValidator : AbstractValidator<UpsertProductCommand>
    {
        public UpsertProductCommandValidator()
        {
            RuleFor(x => x.Name).MaximumLength(50).NotEmpty();
            RuleFor(x => x.Group).NotEmpty();
            RuleFor(x => x.Price).GreaterThan(0).NotEmpty();
        }

    }
}
