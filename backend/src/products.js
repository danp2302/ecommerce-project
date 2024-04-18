//A file to show the products page

const path = require("path");
const fileSystem = require("fs");
const appRoot = path.join(__dirname, "..");
const helperFunctions = require("../helper_functions/helpers");
require("dotenv/config");

const productsFile = path.join(appRoot, "./data", "products.json");

const getProducts = async (req, res) => {
  helperFunctions.readJSONFile(productsFile, (productsErr, productsData) => {
    if (productsErr) {
      return res.status(500).json({
        error: `Error reading products file ${productsErr}`,
        success: false,
      });
    } else {
      const products = productsData.products;
      let productsToSend = [];
      products.map((product) => {
        const encodedImage = fileSystem.readFileSync(product.imageURL);

        productsToSend.push({
          productId: product.id,
          productName: product.name,
          productDescription: product.description,
          productPrice: product.price,
          productImage: encodedImage.toString("base64"),
          productInStock: product.numberInStock,
        });
      });

      return res.status(200).json({
        message: "Successfully retrieved products",
        data: productsToSend,
        success: true,
      });
    }
  });
};

module.exports = { getProducts };
