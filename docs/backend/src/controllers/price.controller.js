const Price = require("../models/Price");

exports.getAll = async (req, res) => {
  try {
    const result = await Price.findAll();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAdvisory = async (req, res) => {
  const { crop } = req.query;
  res.json({ crop, message: `${crop} sathi sadhya bazar bhav sthir aahe. Pudhil aathvadyat vadhnyachi shakyata.` });
};
