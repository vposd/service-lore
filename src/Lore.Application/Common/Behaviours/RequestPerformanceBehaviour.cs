using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Lore.Application.Common.Interfaces.Services;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Lore.Application.Common.Behaviours
{
    public class RequestPerformanceBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    {
        private readonly Stopwatch timer;
        private readonly ILogger<TRequest> logger;
        private readonly ICurrentUserService currentUser;

        public RequestPerformanceBehaviour(
            ILogger<TRequest> logger,
            ICurrentUserService currentUser)
        {
            timer = new Stopwatch();
            this.logger = logger;
            this.currentUser = currentUser;
        }

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            timer.Start();

            var response = await next();

            timer.Stop();

            if (timer.ElapsedMilliseconds > 1000)
            {
                var name = typeof(TRequest).Name;

                logger.LogWarning("Long Request: {Name} ({ElapsedMilliseconds} ms) {@UserId} {@Request}",
                    name, timer.ElapsedMilliseconds, currentUser.UserId, request);
            }

            return response;
        }
    }
}
