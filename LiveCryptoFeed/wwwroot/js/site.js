// SignalR bağlantısını oluşturun
const priceUpdateConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7236/priceUpdateHub") // Hub'ın URL'si
    .build();

// Fiyatların en son değerlerini saklamak için bir nesne oluşturun
const lastPrices = {};

// Bağlantı kurulduğunda fiyat güncellemelerini dinleyin
priceUpdateConnection.on("ReceivePriceUpdate", function (symbol, price) {
    console.log(`Güncellenen Fiyat: ${symbol} - ${price}`);

    // Her coinin kendi elementi ile güncelleme
    let elementId = symbol;
    const priceElement = document.getElementById(elementId);

    if (priceElement) {
        // Önceki fiyatı kontrol edin
        const lastPrice = lastPrices[symbol];

        // Renk değiştirme koşulu
        if (lastPrice !== undefined) {
            if (price > lastPrice) {
                priceElement.style.color = "#4caf50"; // Yeşil (yükselme)
            } else if (price < lastPrice) {
                priceElement.style.color = "#f44336"; // Kırmızı (düşüş)
            }
        }

        // Fiyatı güncelle
        priceElement.innerText = `Price: ${price}`;

        // Son fiyatı kaydet
        lastPrices[symbol] = price;
    }
});

// Bağlantıyı başlat
priceUpdateConnection.start().catch(function (err) {
    return console.error(err.toString());
});
