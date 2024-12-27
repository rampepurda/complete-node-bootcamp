const express = require("express");
const { getAll } = require("../dataEvent/event");
const router = express.Router();

router.get("/products", async (req, res) => {
  const storedData = await getAll();

  return res
    .status(200)
    .json({ products: storedData.products, message: "Response Successful" });
});

module.exports = router;
