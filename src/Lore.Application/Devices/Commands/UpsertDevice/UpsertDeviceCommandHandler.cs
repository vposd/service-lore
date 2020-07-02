using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.Devices.Commands.UpsertDevice
{
    public class UpsertDeviceCommandHandler : IRequestHandler<UpsertDeviceCommand, OperationResult>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public UpsertDeviceCommandHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<OperationResult> Handle(UpsertDeviceCommand request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var device = new Device();

            if (request.Id == null)
                context.Devices.Add(device);
            else
                device = await context.Devices.FindAsync(request.Id, cancellationToken);

            device.Name = request.Name;
            device.SerialNumber = request.SerialNumber;
            device.Attributes = GetAttributes(context, request.Attributes, request.AttributesToCreate);

            await context.SaveChangesAsync(cancellationToken);

            return OperationResult.Success(device.Id);
        }

        private ICollection<ObjectAttributeValue> GetAttributes(
            ILoreDbContext context,
            IEnumerable<DeviceAttribute> existingAttributes,
            IEnumerable<DeviceAttributeCreateCommand> creatingAttributes)
        {
            var creatingList = creatingAttributes.Select(x => new AttributeValue
            {
                AttributeId = x.AttributeId,
                Value = x.Value,
            }).ToArray();

            context.AttributesValues.AddRange(creatingList);
            context.SaveChanges();

            var createdList = creatingList
                .Select(x => new ObjectAttributeValue
                {
                    AttributeId = x.AttributeId,
                    AttributeValueId = x.Id,
                })
                 .ToList();

            return existingAttributes
                .Select(x => new ObjectAttributeValue
                {
                    AttributeId = x.AttributeId,
                    AttributeValueId = x.ValueId,
                })
                 .Concat(createdList)
                 .ToList();

        }
    }
}
