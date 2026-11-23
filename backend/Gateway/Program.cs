var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"))
    .AddOpenApiForYarp();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

builder.Services.AddHealthChecks();

var app = builder.Build();

app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApiForYarp();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/all.json", "NutriAdapt API");
    });
}

app.MapHealthChecks("/health");
app.MapReverseProxy();

app.Run();