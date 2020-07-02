using Lore.Application.Common.Models;
using MediatR;

namespace Lore.Application.Products.Commands.UpsertProduct
{
    public class UpsertProductCommand : IRequest<OperationResult>
    {
        public long? Id { get; set; }
        public long GroupId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool Deleted { get; set; }
    }
}
