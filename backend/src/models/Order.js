const pool = require("../config/db");

const Order = {
  create: (data) =>
    pool.query("INSERT INTO orders (offer_id, status) VALUES ($1,$2) RETURNING *", [data.offer_id, "confirmed"]),
  findByUser: (userId) =>
    pool.query(
      `SELECT o.* FROM orders o
       JOIN offers of ON o.offer_id = of.id
       WHERE of.buyer_id = $1`,
      [userId]
    )
};

module.exports = Order;
