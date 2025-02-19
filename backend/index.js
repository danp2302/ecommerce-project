const express = require("express");
const app = express();
const cors = require("cors");
const products = require("./routes/products");
const basket = require("./routes/baskets");
require("dotenv/config");

app.use(cors());
app.use("/", products);
app.use("/", basket);

app.listen(9000, () => {
  console.log(`Server running on port 9000`);
});
