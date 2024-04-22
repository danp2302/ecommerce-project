const fileSystem = require("fs");

function getImageBase64(imageURL) {
  const encodedImage = fileSystem.readFileSync(imageURL);
  return encodedImage.toString("base64");
}

function readJSONFile(file, callback) {
  fileSystem.readFile(file, "utf-8", (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    const jsonData = JSON.parse(data);
    callback(null, jsonData);
  });
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

const updateJSONFile = async (fileName, newFileContent, propertyName) => {
  const readFile = await readJSONFile(fileName);

  console.log(readFile);
  const prop = readFile[propertyName];

  console.log("here", prop);
  if (prop) {
    for (let i = 0; i < prop.length; i++) {
      console.log("props", prop[i]);
      const item = prop[i];
      for (const field in newFileContent) {
        if (item.hasOwnProperty(field)) {
          item[field] = newFileContent[field];
        }
      }
    }

    await fileSystem.writeFile(
      fileName,
      JSON.stringify(newFileContent, null, 2)
    );
    console.log("File updated successfully");
  }
};

module.exports = { getImageBase64 };
