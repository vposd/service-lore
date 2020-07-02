using System.Collections.Generic;
using Lore.Application.Common.Models;
using MediatR;

namespace Lore.Application.Devices.Commands.UpsertDevice
{
    public class UpsertDeviceCommand : IRequest<OperationResult>
    {
        public long? Id { get; set; }
        public string Name { get; set; }
        public string SerialNumber { get; set; }
        public IEnumerable<DeviceAttribute> Attributes { get; set; }
        public IEnumerable<DeviceAttributeCreateCommand> AttributesToCreate { get; set; }
    }

    public class DeviceAttribute
    {
        public long AttributeId { get; set; }
        public long ValueId { get; set; }
    }

    public class DeviceAttributeCreateCommand
    {
        public long AttributeId { get; set; }
        public string Value { get; set; }
    }
}
