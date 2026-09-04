const express = require("express");
const router = express.Router();
const priceController = require("../controllers/price.controller");

router.get("/", priceController.getAll);
router.get("/advisory", priceController.getAdvisory);

module.exports = router;
