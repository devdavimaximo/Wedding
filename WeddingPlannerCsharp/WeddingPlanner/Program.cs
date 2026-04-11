using WeddingPlanner.Services;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Adiciona serviços na injeção de dependência
builder.Services.AddScoped<DistributionService>();

// 🔹 Adiciona suporte a Controllers
builder.Services.AddControllers();

var configuredOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();
var allowedOrigins = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
foreach (var origin in configuredOrigins)
{
    if (!string.IsNullOrWhiteSpace(origin))
        allowedOrigins.Add(origin.Trim());
}
allowedOrigins.Add("http://localhost:5173");
allowedOrigins.Add("http://127.0.0.1:5173");

builder.Services.AddCors(options =>
{
    options.AddPolicy("WeddingPlannerReact", policy =>
    {
        policy.WithOrigins(allowedOrigins.ToArray())
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// 🔹 Swagger (pra testar a API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 🔹 Middleware de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("WeddingPlannerReact");

// 🔹 Mapeia os controllers
app.MapControllers();

app.Run();
