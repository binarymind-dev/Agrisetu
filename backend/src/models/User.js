const pool = require("../config/db");

const User = {
  create: (data) =>
    pool.query(
      "INSERT INTO users (name, phone, role, village, district, language_pref) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [data.name, data.phone, data.role, data.village, data.district, data.language_pref]
    ),
  findByPhone: (phone) => pool.query("SELECT * FROM users WHERE phone = $1", [phone])
};

module.exports = User;
