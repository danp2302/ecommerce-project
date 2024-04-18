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

module.exports = { getImageBase64, readJSONFile };
