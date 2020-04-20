using Lore.Application.Common.Models;
using MediatR;

namespace Lore.Application.Attributes.Commands.CreateAttributeValue
{
    public class CreateAttributeValueCommand : IRequest<OperationResult>
    {
        public long AttributeId { get; set; }
        public string Value { get; set; }
        public bool IsDefault { get; set; }
    }
}
