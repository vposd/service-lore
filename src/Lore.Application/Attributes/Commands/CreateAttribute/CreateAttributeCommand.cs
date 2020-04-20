using Lore.Application.Common.Models;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.Attributes.Commands.CreateAttribute
{
    public class CreateAttributeCommand : IRequest<OperationResult>
    {
        public string Name { get; set; }
        public AttributeValueType Type { get; set; }
    }
}
