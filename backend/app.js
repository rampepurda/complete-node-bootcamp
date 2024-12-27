const express = require("express");
const app = express();
const routerProducts = require("./routes/products");
const fs = require("node:fs/promises");
const { getAll } = require("./dataEvent/event");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(routerProducts);

const port = process.env.PORT || 4040;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
