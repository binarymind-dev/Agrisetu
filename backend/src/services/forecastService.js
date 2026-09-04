const Price = require("../models/Price");

// Simple linear regression forecast — no external ML lib needed
function forecastPrices(history, days = 7) {
  if (!history.length) return [];
  const n = history.length;
  const xs = history.map((_, i) => i);
  const ys = history.map((p) => Number(p.price));

  const xMean = xs.reduce((a, b) => a + b, 0) / n;
  const yMean = ys.reduce((a, b) => a + b, 0) / n;

  let num = 0, den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - xMean) * (ys[i] - yMean);
    den += (xs[i] - xMean) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  const intercept = yMean - slope * xMean;

  const forecast = [];
  const lastDate = new Date(history[history.length - 1].date);
  for (let i = 1; i <= days; i++) {
    const predicted = intercept + slope * (n - 1 + i);
    const d = new Date(lastDate);
    d.setDate(d.getDate() + i);
    forecast.push({
      date: d.toISOString().split("T")[0],
      price: Math.max(0, Math.round(predicted * 100) / 100),
      predicted: true
    });
  }
  return forecast;
}

async function getForecastData(crop) {
  const result = await Price.findByCrop(crop);
  const history = result.rows.reverse().map((r) => ({
    date: r.date,
    price: r.price,
    predicted: false
  }));
  const forecast = forecastPrices(history, 7);
  return { history, forecast };
}

module.exports = { forecastPrices, getForecastData };
