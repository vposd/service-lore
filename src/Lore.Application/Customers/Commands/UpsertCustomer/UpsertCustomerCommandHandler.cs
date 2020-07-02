using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Exceptions;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Models;
using Lore.Domain.Entities;
using MediatR;

namespace Lore.Application.Customers.Commands.UpsertCustomer
{
    public class UpsertCustomerCommandHandler : IRequestHandler<UpsertCustomerCommand, OperationResult>
    {
        private readonly ILoreDbContextFactory contextFactory;

        public UpsertCustomerCommandHandler(
            ILoreDbContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public async Task<OperationResult> Handle(UpsertCustomerCommand request, CancellationToken cancellationToken)
        {
            using var context = contextFactory.Create();

            var customer = new Customer();

            if (request.Id == null)
                context.Customers.Add(customer);
            else
                customer = await context.Customers.FindAsync(request.Id);

            if (customer == null)
            {
                throw new NotFoundException($"Customer with id {request.Id} not found");
            }

            customer.Name = request.Name;
            customer.Phone = request.Phone;

            await context.SaveChangesAsync(cancellationToken);
            return OperationResult.Success(customer.Id);
        }
    }
}
