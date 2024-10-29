// SignalR bağlantısını oluşturun
const priceUpdateConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7236/priceUpdateHub") // Hub'ın URL'si
    .build();

// Fiyatların en son ve 24 saat önceki değerlerini saklamak için nesneler oluşturun
const lastPrices = {};
const last24hPrices = {};

// Bağlantı kurulduğunda fiyat güncellemelerini dinleyin
priceUpdateConnection.on("ReceivePriceUpdate", function (symbol, price, color, priceChangePercentage) {
    console.log(`Güncellenen Fiyat: ${symbol} - ${price}`);

    // Her coinin kendi elementi ile güncelleme
    let elementId = symbol;
    const priceElement = document.getElementById(elementId);

    if (priceElement) {
        // Önceki fiyatı kontrol edin
        const lastPrice = lastPrices[symbol];

        // Eğer 24 saat önceki fiyat yoksa mevcut fiyatı kaydedin
        if (!last24hPrices[symbol]) {
            last24hPrices[symbol] = price; // 24 saat önceki fiyatı kaydedin
        }

        // Renk değiştirme koşulu (renk parametresini kullanın)
        priceElement.style.color = color; // Renk güncellemesi

        // Fiyatı güncelle
        priceElement.innerText = `Price: ${price}`;

        // Son fiyatı kaydet
        lastPrices[symbol] = price;

        // Yüzde değişimi hesapla ve göster
        const percentageElement = document.getElementById(`${symbol}-percentage`);
        if (percentageElement) {
            // 24 saatlik değişimi göster
            percentageElement.innerText = ` ${priceChangePercentage.toFixed(2)}%`;

            // Yüzde değişimine göre renk ayarla
            percentageElement.style.color = priceChangePercentage < 0 ? 'red' : 'green'; // Negatif değişim kırmızı, pozitif yeşil
        }
    }
});

// Bağlantıyı başlat
priceUpdateConnection.start().catch(function (err) {
    return console.error(err.toString());
});
