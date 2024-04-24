const fileSystem = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fileSystem.readFile);

const getImageBase64 = (imageURL) => {
  const encodedImage = fileSystem.readFileSync(imageURL);
  return encodedImage.toString("base64");
};

const readJSONFile = async (filename) => {
  try {
    const data = await readFileAsync(filename, "utf-8");
    return JSON.parse(data);
  } catch (err) {
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

const returnSingleItemByID = async (fileData, productId) => {
  for (let i = 0; i < fileData.length; i++) {
    if (fileData[i].id === productId) {
      return fileData[i];
    }
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
              item[newContent] = newFileContent[newContent];
            } else {
              const itemsToAdd = newFileContent["items"];
              if (itemsToAdd) {
                const basketItems = item["items"];
                basketItems.push(...itemsToAdd);
              }
            }
          }
        } else if (item.id === parseInt(productId)) {
          for (newContent in newFileContent) {
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
            if (newContent !== "items") {
              item[newContent] = newFileContent[newContent];
            }
          }
        }
      }
      await fileSystem.writeFileSync(
        fileName,
        JSON.stringify(readFile, null, 2)
      );
    }
  } else {
    console.log("Property not found in the file");
  }
};
module.exports = {
  getImageBase64,
  readJSONFile,
  returnStatusMessage,
  returnSingleItemByID,
  updateJSONFile,
};
