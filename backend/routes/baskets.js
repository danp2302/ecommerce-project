const express = require("express");
const router = express.Router();
const {
  addToBasket,
  removeFromBasket,
  numberOfItemsInBasket,
  totalCostOfBasket,
} = require("../src/basket");

router.post("/addItemToBasket/:productId", addToBasket);
router.post("/removeItemFromBasket/:productId", removeFromBasket);
router.get("/numberOfItemsInBasket", numberOfItemsInBasket);
router.get("/totalCostOfBasket", totalCostOfBasket);

module.exports = router;
