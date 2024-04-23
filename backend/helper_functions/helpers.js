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
  productId = null
) => {
  const readFile = await readJSONFile(fileName);

  if (readFile.hasOwnProperty(propertyName)) {
    const prop = readFile[propertyName];

    for (let i = 0; i < prop.length; i++) {
      const item = prop[i];
      if (item.hasOwnProperty("items")) {
        for (const field in newFileContent) {
          if (item.hasOwnProperty(field)) {
            item[field] = newFileContent[field];
          }
        }
      } else {
        if (item.id === productId) {
          for (const field in newFileContent) {
            item[field] = newFileContent[field];
          }
        }
      }
    }
    await fileSystem.writeFile(fileName, JSON.stringify(readFile, null, 2));
    console.log("File updated successfully");
  } else {
    console.log("Property not found in the file");
  }
};

module.exports = { getImageBase64 };
