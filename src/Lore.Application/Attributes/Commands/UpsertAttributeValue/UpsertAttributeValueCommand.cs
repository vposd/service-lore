using Lore.Application.Common.Models;
using MediatR;

namespace Lore.Application.Attributes.Commands.UpsertAttributeValue
{
    public class UpsertAttributeValueCommand : IRequest<OperationResult>
    {
        public long? Id { get; set; }
        public long AttributeId { get; set; }
        public string Value { get; set; }
        public bool IsDefault { get; set; }
    }
}
