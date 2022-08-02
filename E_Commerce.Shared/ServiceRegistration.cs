

using E_Commerce.Application.Interfaces;
using E_Commerce.Domain.Settings;
using E_Commerce.Infrastructure.Shared.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace E_Commerce.Shared
{
    public static class ServiceRegistration
    {
        public static void AddSharedInfrastructure(this IServiceCollection services, IConfiguration _config)
        {
            services.Configure<MailSettings>(_config.GetSection("MailSettings"));
            services.AddTransient<IDateTimeService, DateTimeService>();
            services.AddTransient<IEmailService, EmailService>();
        }
    }
}
