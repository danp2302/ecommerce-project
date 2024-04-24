const path = require("path");
const appRoot = path.join(__dirname, "..");
const fileSystem = require("fs");

const helperFunctions = require("../helper_functions/helpers");
const productsFile = path.join(appRoot, "./data", "products.json");

const getProducts = async (req, res) => {
  const readProductsFile = await helperFunctions.readJSONFile(productsFile);

  if (readProductsFile) {
    const products = readProductsFile.products;
    let productsToSend = [];

    products?.map((product) => {
      const encodedImage = fileSystem.readFileSync(product.imageURL);
      productsToSend.push({
        productId: product?.id,
        productName: product?.name,
        productDescription: product?.description,
        productPrice: product?.price,
        productImage: encodedImage.toString("base64"),
        productInStock: product?.numberInStock,
      });
    });

    return await helperFunctions.returnStatusMessage(
      res,
      "Products retrieved successfully",
      true,
      200,
      productsToSend
    );
  } else {
    return await helperFunctions.returnStatusMessage(
      res,
      "Unable to read file",
      false,
      500
    );
  }
};

module.exports = { getProducts };
