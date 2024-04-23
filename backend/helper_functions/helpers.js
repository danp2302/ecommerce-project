const fileSystem = require("fs");

function getImageBase64(imageURL) {
  const encodedImage = fileSystem.readFileSync(imageURL);
  return encodedImage.toString("base64");
}

const readJSONFile = async (filename) => {
  try {
    const data = await fileSystem.readFile(filename, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const returnStatusMessage = async (
  res,
  message,
  success,
  code,
  data = null
) => {
  let success_state = success;

  return await res.status(code).json({
    message: message,
    data: data,
    success: success_state,
  });
};

const LoopThroughItems = async (fileData, propertyName) => {
  try {
    const data = await readJSONFile(fileData);

    if (!data) {
      console.log("No data found");
      return null;
    }
    //for nested items
    const items = data[propertyName];

    if (propertyName === "products") {
      for (let i = 0; i < items.length; i++) {
        return items;
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        return items[i];
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const ReturnProductId = async (productId, fileData) => {
  const subItems = fileData;
  console.log(subItems);
  if (subItems) {
    for (let i = 0; i < subItems.length; i++) {
      console.log("here", subItems[i].id);
      if (subItems[i].id === productId) {
        console.log("yes");
        return subItems[i];
      }
    }
    return null;
  }
};

const updateJSONFile = async (
  fileName,
  newFileContent,
  propertyName,
  operationType = "",
  productId = null
) => {
  const readFile = await readJSONFile(fileName);

  if (readFile.hasOwnProperty(propertyName)) {
    const prop = readFile[propertyName];

    for (let i = 0; i < prop.length; i++) {
      const item = prop[i];
      if (operationType === "add") {
        if (item.hasOwnProperty("items")) {
          for (newContent in newFileContent) {
            if (newContent !== "items") {
              console.log("checking new", newContent);
              item[newContent] = newFileContent[newContent];
            } else {
              // Add new items to the basket
              const itemsToAdd = newFileContent["items"];
              if (itemsToAdd) {
                const basketItems = item["items"];
                basketItems.push(...itemsToAdd);
              }
            }
          }
        } else if (item.id === parseInt(productId)) {
          for (newContent in newFileContent) {
            console.log(newContent);
            if (newContent !== "items") {
              item[newContent] = newFileContent[newContent];
            }
          }
        }
      } else if (operationType === "remove") {
        if (item.hasOwnProperty("items")) {
          const subItems = item.items;

          for (let i = 0; i < subItems.length; i++) {
            if (subItems[i].id === parseInt(productId)) {
              subItems.splice(i, 1);
              break;
            }
          }
          for (newContent in newFileContent) {
            if (newContent !== "items") {
              item[newContent] = newFileContent[newContent];
            }
          }
        } else if (item.id === parseInt(productId)) {
          for (newContent in newFileContent) {
            console.log(newContent);
            if (newContent !== "items") {
              item[newContent] = newFileContent[newContent];
            }
          }
        }
      }
      await fileSystem.writeFile(fileName, JSON.stringify(readFile, null, 2));
    }
  } else {
    console.log("Property not found in the file");
  }
};
module.exports = { getImageBase64 };
