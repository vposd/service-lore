using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Application.Orders.Events;
using Lore.Application.Orders.Models;
using Lore.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

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

            if (customerId == 0L)
            {
                var customer = await CreateCustomerAsync(model, context, cancellationToken);
                customerId = customer.Id;
            }

            return customerId;
        }

        private async Task<OrderState> GetDefaultStateAsync(ILoreDbContext context, CancellationToken cancellationToken)
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

            if (orderDeviceId == 0L)
            {
                var orderDevice = await CreateOrderDeviceAsync(model, context, cancellationToken);
                orderDeviceId = orderDevice.Id;
            }

            return orderDeviceId;
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
                Description = model.Description,
                OrderDeviceAttributes = model.Attributes?.Select(x => new OrderDeviceAttribute { Id = x.Id, AttributeValueId = x.ValueId }).ToList(),
            };

            if (model.Device.Id != 0L)
            {
                orderDevice.DeviceId = model.Device.Id;
            }
            else
            {
                orderDevice.Device = new Device { Name = model.Device.Name };
            }

            context.OrderDevices.Add(orderDevice);
            await context.SaveChangesAsync(cancellationToken);

            return orderDevice;
        }
    }
}
