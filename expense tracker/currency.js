// Fixed exchange rates
const exchangeRates = {
    USD: { EUR: 0.85, GBP: 0.75, INR: 74.50, JPY: 110.57, AUD: 1.35, CAD: 1.25, CHF: 0.93 },
    EUR: { USD: 1.18, GBP: 0.88, INR: 87.30, JPY: 129.85, AUD: 1.60, CAD: 1.47, CHF: 1.09 },
    GBP: { USD: 1.33, EUR: 1.14, INR: 99.30, JPY: 147.27, AUD: 1.81, CAD: 1.63, CHF: 1.24 },
    INR: { USD: 0.013, EUR: 0.011, GBP: 0.010, JPY: 1.48, AUD: 0.020, CAD: 0.017, CHF: 0.012 },
    JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0068, INR: 0.68, AUD: 0.013, CAD: 0.012, CHF: 0.0091 },
    AUD: { USD: 0.74, EUR: 0.63, GBP: 0.55, INR: 49.50, JPY: 77.80, CAD: 0.92, CHF: 0.70 },
    CAD: { USD: 0.80, EUR: 0.68, GBP: 0.61, INR: 58.00, JPY: 83.00, AUD: 1.09, CHF: 0.79 },
    CHF: { USD: 1.08, EUR: 0.92, GBP: 0.81, INR: 76.50, JPY: 110.00, AUD: 1.43, CAD: 1.27 },
};

// Calculate conversion
function calculateConversion() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    if (fromCurrency === toCurrency) {
        document.getElementById("conversion-result").textContent = "Please select different currencies!";
        return;
    }

    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);
    const currencySymbol = getCurrencySymbol(toCurrency);
    document.getElementById("conversion-result").textContent = `${amount} ${getCurrencySymbol(fromCurrency)} = ${convertedAmount} ${currencySymbol}`;
    
    updateConversionHistory(amount, fromCurrency, convertedAmount, toCurrency);
}

// Swap currencies
function swapCurrencies() {
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    calculateConversion();
}

// Clear inputs and results
function clearFields() {
    document.getElementById("amount").value = '';
    document.getElementById("conversion-result").textContent = '';
}

// Copy to clipboard
function copyToClipboard() {
    const resultText = document.getElementById("conversion-result").textContent;
    navigator.clipboard.writeText(resultText).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        alert("Failed to copy: " + err);
    });
}

// Update conversion history
function updateConversionHistory(amount, fromCurrency, convertedAmount, toCurrency) {
    const historyList = document.getElementById("conversion-history");
    const historyItem = document.createElement("li");
    historyItem.textContent = `${amount} ${getCurrencySymbol(fromCurrency)} converted to ${convertedAmount} ${getCurrencySymbol(toCurrency)}`;
    historyList.prepend(historyItem);
}

// Get currency symbol based on currency code
function getCurrencySymbol(currency) {
    const symbols = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        INR: '₹',
        JPY: '¥',
        AUD: 'A$',
        CAD: 'C$',
        CHF: 'CHF',
    };
    return symbols[currency] || currency;
}

// Toggle dark mode
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const themeButton = document.getElementById("theme-toggle-btn");
    themeButton.textContent = themeButton.textContent.includes("Dark") ? "🌞 Light Mode" : "🌙 Dark Mode";
}

// Event Listeners
document.getElementById("calculate-btn").addEventListener("click", calculateConversion);
document.getElementById("clear-btn").addEventListener("click", clearFields);
document.getElementById("copy-btn").addEventListener("click", copyToClipboard);
document.getElementById("swap-btn").addEventListener("click", swapCurrencies);
document.getElementById("theme-toggle-btn").addEventListener("click", toggleTheme);
