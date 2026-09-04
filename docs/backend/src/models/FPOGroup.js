const pool = require("../config/db");

const FPOGroup = {
  create: (data) =>
    pool.query("INSERT INTO fpo_groups (name, member_farmer_ids) VALUES ($1,$2) RETURNING *", [
      data.name,
      data.member_farmer_ids
    ])
};

module.exports = FPOGroup;
