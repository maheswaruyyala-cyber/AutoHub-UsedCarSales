using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using UsedCarSales.Api.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddCors(options =>
    options.AddPolicy("Angular", policy =>
        policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("Angular");
app.MapControllers();
app.MapGet("/api/health", () => Results.Ok(new { status = "ok", application = "Used Car Sales API" }));

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
    await SeedData.InitializeAsync(db);
}

app.Run();
