using Binance.Net.Clients;
using LiveCryptoFeed.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace LiveCryptoFeed.Controllers
{
    public class HomeController : Controller
    {
        private readonly BinanceSocketClient _binanceSocketClient;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger,BinanceSocketClient binanceSocketClient)
        {
            _binanceSocketClient = binanceSocketClient;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
