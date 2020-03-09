using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Lore.Application.Common.Interfaces.Services;
using Lore.Application.Interfaces.Services;
using Lore.Infrastructure.Excel;
using Lore.Infrastructure.Excel.Export;
using Lore.Infrastructure.Helpers;
using Lore.Infrastructure.Identity;
using Lore.Infrastructure.Identity.Services;

namespace Lore.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddTransient<IUserManager, UserManagerService>();
            services.AddTransient<IAuthenticationService, AuthenticationService>();
            services.AddTransient<IExcelReader, ExcelReader>();
            services.AddTransient<IJwtFactory, JwtFactory>();
            services.AddTransient<IJwtTokenValidator, JwtTokenValidator>();
            services.AddTransient<ITokenFactory, TokenFactory>();
            services.AddTransient<ITokenFactory, TokenFactory>();
            services.AddTransient<IExcelExport, GenericExcelExport>();

            services.AddDbContext<ApplicationIdentityDbContext>(options =>
                options.UseNpgsql(ApplicationConstants.DbConnectionString)
            );

            services.ConfigureAuthentication(configuration);

            return services;
        }

        private static IServiceCollection ConfigureAuthentication(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddRoles<ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationIdentityDbContext>()
                .AddTokenProvider("RefreshApplicationAccess", typeof(DataProtectorTokenProvider<ApplicationUser>))
                .AddDefaultTokenProviders();

            var key = Encoding.ASCII.GetBytes(configuration.GetSection("Jwt:Secret").Value);

            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidAudience = configuration.GetSection("Jwt:Audience").Value,
                        ValidIssuer = configuration.GetSection("Jwt:Issuer").Value,
                        ClockSkew = TimeSpan.Zero
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = context =>
                        {
                            if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                            {
                                context.Response.Headers.Add("Token-Expired", "true");
                            }
                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddAuthorization();

            return services;
        }
    }
}
