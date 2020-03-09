using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces.Services;
using MediatR.Pipeline;
using Microsoft.Extensions.Logging;

namespace Lore.Application.Common.Behaviours
{
    public class RequestLogger<TRequest> : IRequestPreProcessor<TRequest>
    {
        private readonly ILogger logger;
        private readonly ICurrentUserService currentUser;

        public RequestLogger(
            ILogger<TRequest> logger,
            ICurrentUserService currentUser)
        {
            this.logger = logger;
            this.currentUser = currentUser;
        }

        public Task Process(TRequest request, CancellationToken cancellationToken)
        {
            var requestName = typeof(TRequest).Name;

            logger.LogInformation("Request: {Name} {@UserId} {@Request}", requestName, currentUser.UserId, request);

            return Task.CompletedTask;
        }
    }
}
