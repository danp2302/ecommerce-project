const path = require("path");
const appRoot = path.join(__dirname, "..");
const fileSystem = require("fs");

const helperFunctions = require("../helper_functions/helpers");
const productsFile = path.join(appRoot, "./data", "products.json");

const getProducts = async (req, res) => {
  const readProductsFile = await helperFunctions.readJSONFile(productsFile);

  if (!readProductsFile) {
    return await helperFunctions.returnStatusMessage(
      res,
      "Unable to read products file",
      false,
      500
    );
  }

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
};

const searchForProduct = async (req, res) => {
  const productName = req.params.productName;
  const readProductsFile = await helperFunctions.readJSONFile(productsFile);
  let searchMatch = false;

  if (!readProductsFile) {
    return await helperFunctions.returnStatusMessage(
      res,
      "Unable to read products file",
      false,
      500
    );
  }

  let productData = [];
  const products = readProductsFile.products;
  const searchFilter = products?.filter((product) =>
    product?.name.toLowerCase().includes(productName.toLowerCase())
  );

  if (searchFilter) {
    searchMatch = true;
    searchFilter?.map((product) => {
      const encodedImage = fileSystem.readFileSync(product.imageURL);
      productData.push({
        productId: product?.id,
        productName: product?.name,
        productDescription: product?.description,
        productPrice: product?.price,
        productImage: encodedImage.toString("base64"),
        productInStock: product?.numberInStock,
      });
    });
  }

  if (!searchMatch) {
    return await helperFunctions.returnStatusMessage(
      res,
      "Product Not Found",
      false,
      404
    );
  }
  return await helperFunctions.returnStatusMessage(
    res,
    "Product found",
    true,
    200,
    productData
  );
};
module.exports = { getProducts, searchForProduct };
