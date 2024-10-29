using Binance.Net.Clients;
using BlockChainAI;
using LiveCryptoFeed.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddScoped<BinanceService>();
builder.Services.AddSingleton<BinanceSocketClient>();
builder.Services.AddSingleton<BinanceRestClient>();

builder.Services.AddSignalR();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var binanceService = scope.ServiceProvider.GetRequiredService<BinanceService>();
    await binanceService.SubscribeToPriceUpdatesAsync();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapHub<PriceUpdateHub>("/priceUpdateHub");
app.MapHub<PriceUpdateHub>("/priceUpdateFuturesAmount");

app.Run();
