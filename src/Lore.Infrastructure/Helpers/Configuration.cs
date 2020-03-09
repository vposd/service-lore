using System;

namespace Lore.Infrastructure.Helpers
{
    public static class ApplicationConstants
    {
        public static readonly string DbConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
    }
}
