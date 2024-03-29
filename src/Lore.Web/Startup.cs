﻿using FluentValidation.AspNetCore;
using Lore.Application;
using Lore.Application.Common.Interfaces;
using Lore.Application.Common.Interfaces.Services;
using Lore.Infrastructure;
using Lore.Infrastructure.Common.JsonConverters;
using Lore.Infrastructure.Notifications;
using Lore.Persistence;
using Lore.Web.Helpers;
using Lore.Web.Middleware;
using Lore.Web.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NSwag;

namespace Lore
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Application parts
            services.AddControllers();
            services.AddPersistence();
            services.AddInfrastructure(Configuration);
            services.AddApplication();

            services.AddScoped<ICurrentUserService, CurrentUserService>();

            services.AddSignalR()
                .AddJsonProtocol(x =>
                {
                    x.PayloadSerializerOptions.Converters.Add(new LongToStringConverter());
                });

            // Api docs generation
            services.AddOpenApiDocument(configure =>
            {
                configure.Title = "Lore API v.1";
                configure.AddSecurity("Bearer", new OpenApiSecurityScheme
                {
                    In = OpenApiSecurityApiKeyLocation.Header,
                    Description = "Please insert JWT with Bearer into field",
                    Name = "Authorization",
                    Type = OpenApiSecuritySchemeType.ApiKey
                });
            });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder => builder
                .WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            });

            // Controllers behaviour
            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.IgnoreNullValues = true;
                    options.JsonSerializerOptions.Converters.Add(new LongToStringConverter());
                })
                .ConfigureApiBehaviorOptions(options =>
                {
                    options.InvalidModelStateResponseFactory = ModelStateValidator.ValidateModelState;
                })
                 .AddFluentValidation(x => x.RegisterValidatorsFromAssemblyContaining<ILoreDbContext>());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                // app.UseCustomExceptionHandler();
            }
            else
            {
                app.UseHsts();
                app.UseCustomExceptionHandler();
            }

            app.UseStaticFiles();

            app.UseRouting();

            app.UseOpenApi();

            app.UseSwaggerUi3(settings => settings.Path = "/docs");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UsePersistense();

            app.UseInfrastructure();

            app.SeedData();

            app.UseCors("CorsPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<NotificationHub>("/notifications");
            });
        }
    }
}
