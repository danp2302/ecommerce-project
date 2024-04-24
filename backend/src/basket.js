//A file to deal with the basket
const path = require("path");
const appRoot = path.join(__dirname, "..");

const productsFile = path.join(appRoot, "./data", "products.json");
const basketFile = path.join(appRoot, "./data", "basket.json");
const helperFunctions = require("../helper_functions/helpers");

const addToBasket = async (req, res) => {
  const productId = parseInt(req.params.productId);

  const basketData = await helperFunctions.readJSONFile(basketFile);

  const productData = await helperFunctions.readJSONFile(productsFile);

  let getAvailableStock = 0;
  let checkTotalCost = false;
  let checkCheckout = false;
  let checkStock = false;

  let basketItems = {
    id: 0,
    name: "",
    cost: 0,
  };

  if (basketData && productData) {
    const returnItem = await helperFunctions.returnSingleItemByID(
      productData.products,
      parseInt(productId)
    );

    if (returnItem) {
      basketItems = {
        id: returnItem.id,
        name: returnItem.name,
        cost: returnItem.price,
      };
      getAvailableStock = returnItem.numberInStock;
      if (returnItem.numberInStock > 0) {
        checkStock = true;
      }
    } else {
      console.log("Unable to return data, item does not exist");
    }

    const updateItemInStock = {
      numberInStock: (getAvailableStock -= 1),
    };
    const currentBasket = basketData.basket[0];
    if (currentBasket.totalCost >= 0 && currentBasket.checkout >= 0) {
      checkCheckout = true;
      checkTotalCost = true;
    }

    if (checkStock && checkCheckout && checkTotalCost) {
      const newBasketData = {
        items: [basketItems],
        checkout: (currentBasket.checkout += 1),
        totalCost: (currentBasket.totalCost += returnItem.price),
      };
      const updateBasket = await helperFunctions.updateJSONFile(
        basketFile,
        newBasketData,
        "basket",
        "add",
        productId
      );

      const updateProduct = await helperFunctions.updateJSONFile(
        productsFile,
        updateItemInStock,
        "products",
        "add",
        productId
      );
      if (updateBasket && updateProduct) {
        return await helperFunctions.returnStatusMessage(
          res,
          "Item added to basket",
          true,
          200
        );
      } else {
        return await helperFunctions.returnStatusMessage(
          res,
          "Unable to add item to basket",
          false,
          404
        );
      }
    } else {
      return await helperFunctions.returnStatusMessage(
        res,
        "Either the stock or the total cost or the checkout value is less than 0",
        false,
        404
      );
    }
  } else {
    return await helperFunctions.returnStatusMessage(
      res,
      "Unable to read the file",
      false,
      500
    );
  }
};

const removeFromBasket = async (req, res) => {
  const productId = req.params.productId;

  const basketData = await helperFunctions.readJSONFile(basketFile);

  const productData = await helperFunctions.readJSONFile(productsFile);

  let getAvailableStock = 0;
  let checkTotalCost = false;
  let checkCheckout = false;
  let checkStock = false;

  let basketItems = {
    id: 0,
    name: "",
    cost: 0,
  };

  if (basketData && productData) {
    const returnItem = await helperFunctions.returnSingleItemByID(
      productData.products,
      parseInt(productId)
    );

    if (returnItem) {
      basketItems = {
        id: returnItem.id,
        name: returnItem.name,
        cost: returnItem.price,
      };
      getAvailableStock = returnItem.numberInStock;
      if (returnItem.numberInStock >= 0) {
        checkStock = true;
      }
    } else {
      console.log("Unable to return data, item does not exist");
    }

    const updateItemInStock = {
      numberInStock: (getAvailableStock += 1),
    };
    const currentBasket = basketData.basket[0];

    if (currentBasket.totalCost > 0 && currentBasket.checkout > 0) {
      checkCheckout = true;
      checkTotalCost = true;
    }

    const newBasketData = {
      items: [basketItems],
      checkout: (currentBasket.checkout -= 1),
      totalCost: (currentBasket.totalCost -= returnItem.price),
    };
    if (checkStock && checkCheckout && checkTotalCost) {
      const updateBasket = await helperFunctions.updateJSONFile(
        basketFile,
        newBasketData,
        "basket",
        "remove",
        productId
      );

      const updateProducts = await helperFunctions.updateJSONFile(
        productsFile,
        updateItemInStock,
        "products",
        "remove",
        productId
      );

      if (updateBasket && updateProducts) {
        return await helperFunctions.returnStatusMessage(
          res,
          "Item removed from basket",
          true,
          200
        );
      } else {
        return await helperFunctions.returnStatusMessage(
          res,
          "Unable to remove item from basket",
          false,
          404
        );
      }
    } else {
      return await helperFunctions.returnStatusMessage(
        res,
        "Either the stock or the total cost or the checkout value is less than 0",
        false,
        404
      );
    }
  } else {
    return await helperFunctions.returnStatusMessage(
      res,
      "Unable to read the file",
      false,
      500
    );
  }
};

const numberOfItemsInBasket = async (req, res) => {
  const basketData = await helperFunctions.readJSONFile(basketFile);

  if (basketData) {
    const itemsInBasket = basketData.basket[0].checkout;

    if (itemsInBasket >= 0) {
      return await helperFunctions.returnStatusMessage(
        res,
        "Retrieved number of items in basket",
        true,
        200,
        itemsInBasket
      );
    } else {
      return await helperFunctions.returnStatusMessage(
        res,
        "Unable to retrieve number of items in basket",
        true,
        404
      );
    }
  } else {
    return await helperFunctions.returnStatusMessage(
      res,
      "Unable to read file",
      false,
      500
    );
  }
};

const totalCostOfBasket = async (req, res) => {
  const basketData = await helperFunctions.readJSONFile(basketFile);

  if (basketData) {
    const totalCostOfBasket = basketData.basket[0].totalCost;

    if (totalCostOfBasket >= 0) {
      return await helperFunctions.returnStatusMessage(
        res,
        "Retrieved total cost of basket",
        true,
        200,
        totalCostOfBasket
      );
    } else {
      return await helperFunctions.returnStatusMessage(
        res,
        "Unable to retrieve total cost of basket",
        true,
        404
      );
    }
  } else {
    await helperFunctions.returnStatusMessage(
      res,
      "Unable to read file",
      false,
      500
    );
  }
};

module.exports = {
  addToBasket,
  removeFromBasket,
  numberOfItemsInBasket,
  totalCostOfBasket,
};
