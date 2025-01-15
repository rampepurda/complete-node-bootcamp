const express = require("express");
const { v4: generateId } = require("uuid");
const { getAll, deleteProduct, getProduct } = require("../dataEvent/event");
const { writeData } = require("../util/getData");
const router = express.Router();

router.get("/products", async (req, res) => {
  const storedData = await getAll();

  return res.status(200).json({
    products: storedData.products,
    message: "Response Successful",
    productsTotal: storedData.products.length,
  });
});

router.get("/products/:productName", async (req, res) => {
  const product = await getProduct(req.params.productName);

  res.status(200).send({ product: product });
});

router.post("/products", async (req, res) => {
  const dataForm = req.body;
  const newProduct = {
    productName: dataForm.productName,
    from: dataForm.from,
    description: dataForm.description,
    //id: generateId(),
    id: Math.floor(Math.random() * 1000),
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
  const id = req.params.id * 1;
  await deleteProduct(id);

  res.json({ message: "Deleted successfully" });
});

module.exports = router;
