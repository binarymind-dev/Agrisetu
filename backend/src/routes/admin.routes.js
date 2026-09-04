const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

router.get("/analytics", adminController.getAnalytics);

module.exports = router;
