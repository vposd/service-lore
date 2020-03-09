using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Lore.Web.Config
{
    public static class SentryConfig
    {
        public static IWebHostBuilder UseSentryOnProduction(this IWebHostBuilder webHostBuilder) => webHostBuilder.ConfigureAppConfiguration(RegisterSentryConfig(webHostBuilder));

        private static Action<WebHostBuilderContext, IConfigurationBuilder> RegisterSentryConfig(IWebHostBuilder webHostBuilder) => (hostingContext, config) =>
        {
            var env = hostingContext.HostingEnvironment;
            if (env.IsProduction())
            {
                webHostBuilder.UseSentry();
            }
        };
    }
}
