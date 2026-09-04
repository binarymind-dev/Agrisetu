const Order = require("../models/Order");

exports.getByUser = async (req, res) => {
  try {
    const result = await Order.findByUser(req.query.userId);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
