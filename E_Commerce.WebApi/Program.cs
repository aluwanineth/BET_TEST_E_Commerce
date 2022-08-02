using E_Commerce.Application;
using E_Commerce.Application.Interfaces;
using E_Commerce.Identity;
using E_Commerce.Identity.Contexts;
using E_Commerce.Infrastructure.Persistence;
using E_Commerce.Infrastructure.Persistence.Contexts;
using E_Commerce.Shared;
using E_Commerce.WebApi.Extensions;
using E_Commerce.WebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

ConfigurationManager _config = builder.Configuration;

builder.Services.AddApplicationLayer();
builder.Services.AddIdentityInfrastructure(_config);
builder.Services.AddPersistenceInfrastructure(_config);
builder.Services.AddSharedInfrastructure(_config);
builder.Services.AddSwaggerExtension();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers(options =>
{
    options.CacheProfiles.Add("ProductCache",
        new CacheProfile()
        {
            Duration = 600
        });
});
builder.Services.AddApiVersioningExtension();
builder.Services.AddHealthChecks();
builder.Services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();
builder.Services.AddCors();
builder.Services.AddResponseCaching();


var app = builder.Build();
using (var serviceScope = app.Services.GetService<IServiceScopeFactory>().CreateScope())
{
    var context = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();

    var appIdentityDbContext = serviceScope.ServiceProvider.GetRequiredService<IdentityContext>();
    appIdentityDbContext.Database.Migrate();
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true) // allow any origin
                .AllowCredentials()); // allow credentials
app.UseAuthentication();
app.UseAuthorization();
app.UseSwaggerExtension();
app.UseErrorHandlingMiddleware();
app.UseHealthChecks("/health");
app.UseResponseCaching();
app.MapControllers();

app.Run();
