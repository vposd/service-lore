using MediatR;
using Lore.Application.Common.Models;

namespace Lore.Application.Clients.Commands.ImportClients
{
    public class ImportClientsCommand : ImportDataRequest, IRequest<ImportOperationResult>
    { }
}
