const pool = require("../config/db");

const Listing = {
  create: (data) =>
    pool.query(
      "INSERT INTO listings (farmer_id, crop, quantity, unit, quality_grade, location) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [data.farmer_id, data.crop, data.quantity, data.unit, data.quality_grade, data.location]
    ),
  findAll: () => pool.query("SELECT * FROM listings WHERE status = 'open' ORDER BY created_at DESC")
};

module.exports = Listing;
