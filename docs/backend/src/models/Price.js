const pool = require("../config/db");

const Price = {
  findAll: () => pool.query("SELECT * FROM prices ORDER BY date DESC LIMIT 100"),
  findByCrop: (crop) => pool.query("SELECT * FROM prices WHERE crop = $1 ORDER BY date DESC LIMIT 30", [crop])
};

module.exports = Price;
