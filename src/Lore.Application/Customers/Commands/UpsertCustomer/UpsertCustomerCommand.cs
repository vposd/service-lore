using Lore.Application.Common.Models;
using MediatR;

namespace Lore.Application.Customers.Commands.UpsertCustomer
{
    public class UpsertCustomerCommand : IRequest<OperationResult>
    {
        public long? Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
    }
}
