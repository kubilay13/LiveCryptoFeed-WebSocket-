// SignalR bağlantısını oluşturun
const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7236/priceUpdateHub") // Hub'ın URL'si
    .build();

// Bağlantı kurulduğunda fiyat güncellemelerini dinle
connection.on("ReceivePriceUpdate", function (symbol, price) {
    console.log(`Güncellenen Fiyat: ${symbol} - ${price}`);

    // Her coinin kendi elementi ile güncelleme
    let elementId = symbol; // Örneğin BTCUSDT için 'BTCUSDT' olacak
    const priceElement = document.getElementById(elementId);

    if (priceElement) {
        // Eğer fiyat varsa, güncelle
        priceElement.innerText = `${price}`; // Sadece fiyatı yaz
    }
});

// Bağlantıyı başlat
connection.start().catch(function (err) {
    return console.error(err.toString());
});


