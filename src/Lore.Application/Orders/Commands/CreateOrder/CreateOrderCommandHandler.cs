using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Application.Orders.Events.OrderCreated;
using Lore.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using static Lore.Application.Orders.Models.OrderWriteModel;

namespace Lore.Application.Orders.Commands.CreateOrder
{
    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, OperationResult>
    {
        private readonly ILoreDbContextFactory contextFactory;
        private readonly IMediator mediator;

        public CreateOrderCommandHandler(
            ILoreDbContextFactory contextFactory,
            IMediator mediator)
        {
            this.contextFactory = contextFactory;
            this.mediator = mediator;
        }


        public async Task<OperationResult> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();
            using var transaction = context.Database.BeginTransaction();

            var order = new Order();

            order.Description = order.Description;
            order.CustomerId = await GetCustomerIdAsync(request.Customer, context, cancellationToken);
            order.OrderDeviceId = await GetOrderDeviceIdAsync(request.OrderDevice, context, cancellationToken);

            var defaultState = await GetDefaultStateAsync(context, cancellationToken);
            order.SetState(defaultState.Id);

            context.Orders.Add(order);

            await context.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);
            await mediator.Publish(new OrderCreatedEvent { OrderId = order.Id });

            return OperationResult.Success();
        }

        private async Task<long> GetCustomerIdAsync(CustomerModel model, ILoreDbContext context, CancellationToken cancellationToken)
        {
            var customerId = model.Id;

            if (customerId == null)
            {
                var customer = await CreateCustomerAsync(model, context, cancellationToken);
                customerId = customer.Id;
            }

            return (long)customerId;
        }

        private async Task<OrderStatus> GetDefaultStateAsync(ILoreDbContext context, CancellationToken cancellationToken)
        {
            var defaultState = await context.OrderStates
                .AsNoTracking()
                .Where(x => x.IsDefault == 1)
                .FirstOrDefaultAsync(cancellationToken);

            if (defaultState == null)
            {
                throw new Exception("[OrderState] Missing default order state");
            }

            return defaultState;
        }

        private async Task<long> GetOrderDeviceIdAsync(OrderDeviceModel model, ILoreDbContext context, CancellationToken cancellationToken)
        {
            var orderDeviceId = model.Id;

            if (orderDeviceId == null)
            {
                var orderDevice = await CreateOrderDeviceAsync(model, context, cancellationToken);
                orderDeviceId = orderDevice.Id;
            }

            return (long)orderDeviceId;
        }

        private async Task<Customer> CreateCustomerAsync(CustomerModel model, ILoreDbContext context, CancellationToken cancellationToken)
        {
            var customer = new Customer
            {
                Name = model.Name,
                Phone = model.Phone
            };

            context
                .Customers
                .Add(customer);

            await context.SaveChangesAsync(cancellationToken);

            return customer;
        }

        private async Task<OrderDevice> CreateOrderDeviceAsync(OrderDeviceModel model, ILoreDbContext context, CancellationToken cancellationToken)
        {
            var orderDevice = new OrderDevice
            {
                OrderDeviceFailures = model.Failures?
                    .Select(x => new OrderDeviceFailure { Id = x.Id })
                    .ToList(),
                OrderDeviceAttributes = model.Attributes?
                    .Select(x => new ObjectAttributeValue
                    {
                        AttributeId = x.Id,
                        AttributeValueId = x.ValueId,
                    })
                    .ToList(),
            };

            if (model.Device.Id != null)
            {
                orderDevice.DeviceId = (long)model.Device.Id;
            }
            else
            {
                orderDevice.Device = new Device
                {
                    Name = model.Device.Name,
                    SerialNumber = model.Device.SerialNumber,
                    Attributes = model.Device.Attributes?
                        .Select(x => new ObjectAttributeValue
                        {
                            AttributeId = x.Id,
                            AttributeValueId = x.ValueId
                        })
                        .ToList(),
                };
            }

            context.OrderDevices.Add(orderDevice);
            await context.SaveChangesAsync(cancellationToken);

            return orderDevice;
        }
    }
}
