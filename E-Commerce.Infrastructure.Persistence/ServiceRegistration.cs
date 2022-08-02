using E_Commerce.Application.Interfaces;
using E_Commerce.Application.Interfaces.Repositories;
using E_Commerce.Infrastructure.Persistence.Contexts;
using E_Commerce.Infrastructure.Persistence.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace E_Commerce.Infrastructure.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
           
            services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
            
            services.AddTransient(typeof(IGenericRepositoryAsync<>), typeof(GenericRepositoryAsync<>));
            services.AddTransient<IProductRepositoryAsync, ProductRepositoryAsync>();
            services.AddTransient<IOrderRepositoryAsync, OrderRepositoryAsync>();
            services.AddTransient<IOrderItemRepositoryAsync, OrderItemRepositoryAsync>();

        }
    }
}
