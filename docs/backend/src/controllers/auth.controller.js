const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone } = req.body;
    const result = await User.findByPhone(phone);
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
