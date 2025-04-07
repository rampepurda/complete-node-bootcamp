const express = require("express");
const app = express();
const routerProducts = require("./routes/productsRoutes");
const routerCart = require("./routes/cartRoutes");
const routerPlaylist = require("./routes/playlistRoutes");
const { json } = require("express");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
app.use(json());
app.use(routerProducts);
app.use(routerCart);
app.use(routerPlaylist);

const port = process.env.PORT || 4040;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
