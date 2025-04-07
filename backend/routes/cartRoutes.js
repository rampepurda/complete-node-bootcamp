const express = require("express");
const { v4: generateId } = require("uuid");
const { getAll, addProductOrder, alreadyOrderedProduct, deleteProductCart, replaceProductCart
} = require("../dataEvent/event");
const router = express.Router();

router.get("/cart", async (req, res) => {
  const storedData = await getAll();
  const cart = storedData.cart

  if(!cart) {
    return res.json({message: 'Any order yet'});
  }

  const itemPriceTotal = cart.reduce((accumulator, currentValue) => accumulator + Number(currentValue.priceTotal), 0)

  return res.status(200).json({
    productsOrdered: cart,
    productsOrderTotal: storedData.cart.length,
    priceTotal: itemPriceTotal,
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

router.patch('/cart/incr/:id', async (req, res, next) => {
  const paramsId = Number(req.params.id)
  const dataApi = await getAll()

  const index = dataApi.cart.findIndex((item) => item.id === paramsId)
  const selectedCart = dataApi.cart[index]


  if(selectedCart) {
    const itemTotalPrice = (selectedCart.piece + 1) * Number(selectedCart.price)

    try {
      await replaceProductCart(paramsId, {
        productName: selectedCart.productName,
        from: selectedCart.from,
        description: selectedCart.description,
        price: selectedCart.price,
        piece: selectedCart.piece + 1,
        priceTotal: itemTotalPrice.toString()
      })
    } catch (error) {
      next(error)
    }
  }

  if(res.status(400)) {
    res.json({message: 'Wrong Id'})
  }
})

router.patch('/cart/decr/:id', async (req, res, next) => {
  const paramsId = Number(req.params.id)
  const dataApi = await getAll()

  const index = dataApi.cart.findIndex((item) => item.id === paramsId)
  const selectedCart = dataApi.cart[index]

  if(selectedCart) {
    const itemTotalPrice = selectedCart.priceTotal - selectedCart.price

    try {
      await replaceProductCart(paramsId, {
        productName: selectedCart.productName,
        from: selectedCart.from,
        description: selectedCart.description,
        price: selectedCart.price,
        piece: selectedCart.piece - 1,
        priceTotal: itemTotalPrice.toString()
      })
    } catch (error) {
      next(error)
    }
  }

  if(res.status(400)) {
    res.json({message: 'Wrong Id'})
  }
})

module.exports = router;
