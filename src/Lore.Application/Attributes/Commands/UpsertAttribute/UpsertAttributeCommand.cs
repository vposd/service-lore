using Lore.Application.Common.Models;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.Attributes.Commands.UpsertAttribute
{
    public class UpsertAttributeCommand : IRequest<OperationResult>
    {
        public long? Id { get; set; }
        public string Name { get; set; }
        public AttributeValueType Type { get; set; }
        public AttributeObject ObjectType { get; set; }
    }
}
