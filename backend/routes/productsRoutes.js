const express = require("express");
const { v4: generateId } = require("uuid");
const {
  getAll,
  deleteProduct,
  getProduct,
  addProduct,
} = require("../dataEvent/event");
const router = express.Router();
const cOption = {
  httpOnly: true,
};

router.get("/products", async (req, res) => {
  const storedData = await getAll();
  const { sort } = await req.query;

  if (sort === "asc") {
    return res.status(200).json({
      products: storedData.products.sort((a, b) => {
        const nameA = a.productName.toUpperCase();
        const nameB = b.productName.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
    });
  }

  if (sort === "lowestPrice") {
    return res.status(200).json({
      products: storedData.products.sort((a, b) => {
        const nameA = a.price.toUpperCase();
        const nameB = b.price.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
    });
  }

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

router.post("/products", async (req, res, next) => {
  const dataForm = req.body;

  try {
    await addProduct(dataForm);
    res.cookie("product", dataForm.productName, cOption);
    res.status(201).json({ message: "Data successfully posted" });
  } catch (error) {
    next(error);
  }
});

router.delete("/products/:id", async (req, res) => {
  const id = req.params.id * 1;
  await deleteProduct(id);

  res.json({ message: "Deleted successfully" });
});

module.exports = router;
