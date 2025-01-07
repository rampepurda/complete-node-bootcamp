const express = require("express");
const { v4: generateId } = require("uuid");
const { getAll, deleteProduct } = require("../dataEvent/event");
const { writeData } = require("../util/getData");
const router = express.Router();

router.get("/products", async (req, res) => {
  const storedData = await getAll();

  return res
    .status(200)
    .json({ products: storedData.products, message: "Response Successful" });
});

router.post("/products", async (req, res) => {
  const dataForm = req.body;
  const newProduct = {
    productName: dataForm.productName,
    from: dataForm.from,
    description: dataForm.description,
    id: generateId(),
  };
  const storedData = await getAll();

  storedData.products.unshift(newProduct);
  await writeData(storedData);

  res.json({
    message: "Data successfully posted",
    newProduct: newProduct,
  });
});

router.delete("/products/:id", async (req, res) => {
  await deleteProduct(req.params.id);

  res.json({ message: "Deleted successfully" });
});

module.exports = router;
