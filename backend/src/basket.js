//A file to deal with the basket
const path = require("path");
const fileSystem = require("fs");
const appRoot = path.join(__dirname, "..");
require("dotenv/config");

const helperFunctions = require("../helper_functions/helpers");
const productsFile = path.join(appRoot, "./data", "products.json");
const basketFile = path.join(appRoot, "./data", "basket.json");

const addToBasket = async (req, res) => {
  const productId = parseInt(req.params.productId);
  helperFunctions.readJSONFile(productsFile, (productsErr, productsData) => {
    helperFunctions.readJSONFile(basketFile, (basketErr, basketData) => {
      if (productsErr) {
        return res.status(500).json({
          message: `Unable to read products file ${productsErr}`,
          success: false,
        });
      }
      if (basketErr) {
        return res.status(500).json({
          message: `Unable to read basket file ${basketErr}`,
          success: false,
        });
      }

      const product = productsData.products.find(
        (product) => product.id === parseInt(productId)
      );

      if (!product || product.numberInStock <= 0) {
        return res.status(404).json({
          message: "Product not found or out of stock",
          success: false,
        });
      }
      product.numberInStock -= 1;

      let basketItem = {
        name: product.name,
        cost: product.price,
      };

      let basket = basketData.basket[0];

      if (!basket) {
        basket = {
          items: [basketItem],
          checkout: 1,
          totalCost: product.price,
        };
        basketData.basket.push(basket);
      } else {
        basket.items.push(basketItem);
        basket.totalCost += product.price;
        basket.checkout += 1;
      }
      fileSystem.writeFile(
        basketFile,
        JSON.stringify(basketData, null, 2),
        (writeBasketErr) => {
          if (writeBasketErr) {
            return res.status(500).json({
              message: `Error writing to basket file ${writeBasketErr}`,
              success: false,
            });
          }

          fileSystem.writeFile(
            productsFile,
            JSON.stringify(productsData, null, 2),
            (writeProductsErr) => {
              if (writeProductsErr) {
                return res.status(500).json({
                  message: `Error writing to products file ${writeProductsErr}`,
                  success: false,
                });
              }

              return res.status(200).json({
                message: `Product added to basket successfully`,
                basket,
                success: true,
              });
            }
          );
        }
      );
    });
  });
};
const removeFromBasket = async (req, res) => {
  const productId = req.params.productId;

  helperFunctions.readJSONFile(productsFile, (productsErr, productsData) => {
    helperFunctions.readJSONFile(basketFile, (basketErr, basketData) => {
      if (productsErr) {
        return res.status(500).json({
          message: `Unable to read products file ${productsErr}`,
          success: false,
        });
      }
      if (basketErr) {
        return res.status(500).json({
          message: `Unable to read basket file ${basketErr}`,
          success: false,
        });
      }

      const product = productsData.products.find(
        (product) => product.id === parseInt(productId)
      );

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      product.numberInStock += 1;

      const itemIndex = basketData.basket[0].items.findIndex(
        (item) => item.name === product.name && item.cost === product.price
      );

      if (itemIndex !== -1) {
        basketData.basket[0].items.splice(itemIndex, 1);
        basketData.basket[0].totalCost -= product.price;
        basketData.basket[0].checkout -= 1;

        fileSystem.writeFile(
          basketFile,
          JSON.stringify(basketData, null, 2),
          (writeBasketErr) => {
            if (writeBasketErr) {
              return res.status(500).json({
                message: `Error writing to basket file ${writeBasketErr}`,
                success: false,
              });
            }

            fileSystem.writeFile(
              productsFile,
              JSON.stringify(productsData, null, 2),
              (writeProductsErr) => {
                if (writeProductsErr) {
                  return res.status(500).json({
                    message: `Error writing to basket file ${writeProductsErr}`,
                    success: false,
                  });
                }

                res.status(200).json({
                  message: `Product removed from basket successfully`,
                  data: basketData.basket[0],
                  success: true,
                });
              }
            );
          }
        );
      } else {
        return res
          .status(404)
          .json({ message: "Item not found in basket", success: false });
      }
    });
  });
};

const numberOfItemsInBasket = (req, res) => {
  helperFunctions.readJSONFile(basketFile, (checkoutErr, basketData) => {
    if (checkoutErr) {
      return res.status(500).json({
        message: `Error reading checkout file ${checkoutErr}`,
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "Successfully retrieved total number of items at checkout",
        data: basketData.basket[0].checkout,
        success: true,
      });
    }
  });
};

const totalCostOfBasket = (req, res) => {
  helperFunctions.readJSONFile(basketFile, (checkoutErr, basketData) => {
    if (checkoutErr) {
      return res.status(500).json({
        message: `Error reading checkout file ${checkoutErr}`,
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "Successfully retrieved total cost of basket",
        data: basketData.basket[0].totalCost,
        success: true,
      });
    }
  });
};

module.exports = {
  addToBasket,
  removeFromBasket,
  numberOfItemsInBasket,
  totalCostOfBasket,
};
