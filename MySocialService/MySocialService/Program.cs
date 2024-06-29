using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using MySocialService.Data;
using MySocialService.Models;
using MySocialService.Services.API;
using MySocialService.Services;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Configure Swagger/OpenAPI

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // Add security definition for OAuth2

    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    // Add operation filter to require authorization

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

// Configure Entity Framework with SQL Server

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add authorization services

builder.Services.AddAuthorization();

// Add Identity services and configure them to use Entity Framework

builder.Services.AddIdentityApiEndpoints<UserModel>()
    .AddEntityFrameworkStores<DataContext>();


builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapIdentityApi<UserModel>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
