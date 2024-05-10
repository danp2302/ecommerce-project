const express = require("express");
const router = express.Router();
const { getProducts, searchForProduct } = require("../src/products");

router.get("/getProducts", getProducts);
router.get("/searchForProduct/:productName", searchForProduct);

module.exports = router;
