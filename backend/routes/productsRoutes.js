const express = require("express");
const { v4: generateId } = require("uuid");
const { getAll, deleteProduct, getProduct, addProduct, addProductOrder, alreadyOrderedProduct, deleteProductCart } = require("../dataEvent/event");
const router = express.Router();
const cOption = {
  httpOnly: true
}

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

router.post("/products", async (req, res, next) => {
  const dataForm = req.body;

  try {
    await addProduct(dataForm)
    res.cookie('product', dataForm.productName, cOption)
    res.status(201).json({ message: 'Data successfully posted', newProduct: {
      productName: dataForm.productName,
      from: dataForm.from,
      description: dataForm.description,
    } })

  } catch (error) {
    next(error)
  }
});

router.delete("/products/:id", async (req, res) => {
  const id = req.params.id * 1;
  await deleteProduct(id);

  res.json({ message: "Deleted successfully" });
});

router.get("/cart", async (req, res) => {
  const storedData = await getAll();
  const cart = storedData.cart

  if(!cart) {
    return res.json({message: 'Any order yet'});
  }

  return res.status(200).json({
    productsOrdered: cart,
    productsOrderTotal: storedData.cart.length,
    //priceTotal: storedData.orderedProducts.length,
  });
});

router.post("/cart/:id", async (req, res, next) => {
  const id = Number(req.params.id)
  const isOrderedProduct = await alreadyOrderedProduct(id)

  if(isOrderedProduct) {
    res.json({ message: "Already ordered"});
  } else {
    await addProductOrder(id)
    res.json({ message: "Ordered successfully"});
  }
});

router.delete("/cart/:id", async (req, res) => {
  const id = req.params.id * 1;
  await deleteProductCart(id);

  res.json({ message: "Deleted successfully" });
});

module.exports = router;
