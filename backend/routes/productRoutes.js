const express = require("express");
const router = express.Router();
const { getProducts } = require("../src/products");

router.get("/getProducts", getProducts);

module.exports = router;
