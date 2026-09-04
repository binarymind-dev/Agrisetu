const Price = require("../models/Price");

async function getLatestPrices(crop) {
  const result = await Price.findByCrop(crop);
  return result.rows;
}

module.exports = { getLatestPrices };
