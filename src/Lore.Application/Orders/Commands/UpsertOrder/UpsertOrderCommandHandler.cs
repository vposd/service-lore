using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Enumerators;
using Lore.Application.Common.Exceptions;
using Lore.Application.Common.Extensions.EF;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Application.Customers.Commands.UpsertCustomer;
using Lore.Application.Devices.Commands.UpsertDevice;
using Lore.Application.Orders.Events.OrderProcess;
using Lore.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lore.Application.Orders.Commands.UpsertOrder
{
    public class UpsertOrderCommandHandler : IRequestHandler<UpsertOrderCommand, OperationResult>
    {
        private readonly ILoreDbContextFactory contextFactory;
        private readonly IMediator mediator;

        public UpsertOrderCommandHandler(
            ILoreDbContextFactory contextFactory,
            IMediator mediator)
        {
            this.contextFactory = contextFactory;
            this.mediator = mediator;
        }

        public async Task<OperationResult> Handle(UpsertOrderCommand request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();
            using var transaction = context.Database.BeginTransaction();
            var operation = request.Id == 0L
                ? ProcessOperation.Create
                : ProcessOperation.Update;

            var order = context.Orders
                .Where(x => x.Id == request.Id)
                .Include(x => x.Device)
                .Include(x => x.DeviceAttributes)
                .Include(x => x.DeviceFailures)
                .Include(x => x.Items)
                .FirstOrDefault();

            if (operation == ProcessOperation.Create)
            {
                order = new Order();
                context.Orders.Add(order);
            }

            if (order == null)
            {
                throw new NotFoundException($"Order with id {request.Id} not found");
            }

            order.Description = request.Description;
            order.DateIn = request.DateIn;

            order.CustomerId = await UpsertCustomerAsync(request.Customer, cancellationToken);
            order.DeviceId = await UpsertDeviceAsync(request.Device, cancellationToken);

            order.DeviceAttributes.Clear();
            order.DeviceAttributes = await MergeDeviceAttributesAsync(context, request.DeviceAttributes, request.DeviceAttributesToCreate, cancellationToken);

            var failures = await MergeFailuresAsync(context, order.Id, request.Failures, cancellationToken);
            context.TryPatchManyToMany(order.DeviceFailures, failures, x => x.Id);

            order.SetState(await GetDefaultStateIdAsync(context, cancellationToken));

            order.UpsertItems(
                existing: request.Items
                    .Where(x => x.Id != null)
                    .Select(x => new OrderItem { Id = (long)x.Id, ProductId = x.ProductId, Quantity = x.Quantity, Amount = x.Amount })
                    .ToList(),
                creating: request.Items
                    .Where(x => x.Id == null)
                    .Select(x => new OrderItem { ProductId = x.ProductId, Quantity = x.Quantity, Amount = x.Amount })
                    .ToList()
            );


            await context.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);

            await mediator.Publish(
                new OrderProcessEvent { OrderId = order.Id, Operation = operation },
                cancellationToken);

            return OperationResult.Success(order.Id);
        }

        private async Task<ICollection<ObjectAttributeValue>> MergeDeviceAttributesAsync(
            ILoreDbContext context,
            IEnumerable<ExistingAttributeCommandModel> existingAttributes,
            IEnumerable<CreatingAttributeCommandModel> creatingAttributes,
            CancellationToken cancellationToken)
        {
            var creatingList = creatingAttributes
                .Select(x => new AttributeValue
                {
                    AttributeId = x.AttributeId,
                    Value = x.Value,
                })
                .ToArray();

            if (creatingList != null)
                context.AttributesValues.AddRange(creatingList);

            await context.SaveChangesAsync(cancellationToken);

            var createdList = creatingList
                .Select(x => new ObjectAttributeValue
                {
                    AttributeId = x.AttributeId,
                    AttributeValueId = x.Id,
                })
                 .ToList();

            return existingAttributes?
                .Select(x => new ObjectAttributeValue
                {
                    AttributeId = x.AttributeId,
                    AttributeValueId = x.ValueId,
                })
                 .Concat(createdList)
                 .ToList();
        }

        private async Task<ICollection<DeviceFailure>> MergeFailuresAsync(
             ILoreDbContext context,
             long orderId,
             IEnumerable<SimpleEntityCommandModel> list,
             CancellationToken cancellationToken)
        {
            var creatingList = list
                .Where(x => x.Id == null)
                .Select(x => new Failure { Name = x.Name })
                .ToArray();

            context.Failures.AddRange(creatingList);

            await context.SaveChangesAsync(cancellationToken);

            var createdList = creatingList
                 .Select(x => new DeviceFailure { FailureId = x.Id, OrderId = orderId })
                 .ToList();

            return list
                 .Where(x => x.Id != null)
                 .Select(x => new DeviceFailure { FailureId = (long)x.Id, OrderId = orderId })
                 .Concat(createdList)
                 .ToList();
        }

        private async Task<long> UpsertCustomerAsync(CustomerCommandModel customer, CancellationToken cancellationToken)
        {
            var result = await mediator.Send(new UpsertCustomerCommand
            {
                Id = customer.Id,
                Name = customer.Name,
                Phone = customer.Phone
            }, cancellationToken);

            return result.EntityId;
        }

        private async Task<long> GetDefaultStateIdAsync(ILoreDbContext context, CancellationToken cancellationToken)
        {
            var defaultState = await context.OrderStatuses
                .AsNoTracking()
                .Where(x => x.IsDefault == 1)
                .FirstOrDefaultAsync(cancellationToken);

            if (defaultState == null)
                throw new Exception("[OrderState] Missing default order state");

            return defaultState.Id;
        }

        private async Task<long> UpsertDeviceAsync(DeviceCommandModel model, CancellationToken cancellationToken)
        {
            var result = await mediator.Send(new UpsertDeviceCommand
            {
                Id = model.Id,
                Name = model.Name,
                SerialNumber = model.SerialNumber,
                Attributes = model.Attributes?.Select(x => new DeviceAttribute { AttributeId = x.AttributeId, ValueId = x.ValueId }),
                AttributesToCreate = model.AttributesToCreate?.Select(x => new DeviceAttributeCreateCommand { AttributeId = x.AttributeId, Value = x.Value }),
            }, cancellationToken);

            return result.EntityId;
        }
    }
}
