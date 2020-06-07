using System;
using System.Linq;
using System.Reflection;
using AutoMapper;
using Lore.Application.Common.Behaviours;
using Lore.Application.Common.Commands.ChangeDeletedStatus;
using Lore.Application.Common.Models;
using Lore.Domain.Common;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Lore.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestPerformanceBehaviour<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));

            services.RegisterChangeDeletedStatusHandlers();

            return services;
        }

        private static void RegisterChangeDeletedStatusHandlers(this IServiceCollection services)
        {
            var deletableEntitiesTypes = AppDomain.CurrentDomain
               .GetAssemblies()
               .SelectMany(assembly => assembly.GetTypes())
               .Where(type => typeof(DeletableEntity).IsAssignableFrom(type));

            foreach (var deletableEntityType in deletableEntitiesTypes)
            {
                var type = typeof(ChangeDeletedStatusCommand<>).MakeGenericType(deletableEntityType);
                var requestType = typeof(IRequestHandler<,>).MakeGenericType(type, typeof(OperationResult));
                var requestHandlerType = typeof(ChangeDeletedStatusCommandHandler<>).MakeGenericType(deletableEntityType);
                services.AddScoped(requestType, requestHandlerType);
            }
        }
    }
}
