const pool = require("../config/db");

const Offer = {
  create: (data) =>
    pool.query(
      "INSERT INTO offers (listing_id, buyer_id, offer_price) VALUES ($1,$2,$3) RETURNING *",
      [data.listing_id, data.buyer_id, data.offer_price]
    ),
  findByListing: (listingId) => pool.query("SELECT * FROM offers WHERE listing_id = $1", [listingId])
};

module.exports = Offer;
