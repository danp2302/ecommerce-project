const express = require("express");
const router = express.Router();
const { getProducts, searchForProduct } = require("../src/products");

router.get("/products", getProducts);
router.get("/search/:productName", searchForProduct);

module.exports = router;
