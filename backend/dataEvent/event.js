const { readData, writeData } = require("../util/getData");

async function getAll() {
  const storedData = await readData();

  if (!storedData) {
    throw Response.json("Could not find any events.");
  }

  return storedData;
}

async function addProduct(data) {
  const { productName, from, description } = data;
  const storedData = await readData();
  // Form onSubmit Product does not send price. That is the reason price is fix set up.
  storedData.products.unshift({
    productName,
    from,
    description,
    id: Math.floor(Math.random() * 1000),
    price: "3.00",
    priceTotal: 3.0,
  });
  await writeData(storedData);
}

async function getProduct(title) {
  const storedData = await readData();
  const product = storedData.products.find(
    (product) => product.productName === title,
  );

  if (!storedData.products || storedData.products.length === 0) {
    throw Response.json("Could not find any events.");
  }

  if (!product) {
    throw Response.json("Could not find event for id " + title);
  }

  return product;
}

async function replacePlaylist(id, data) {
  const storedData = await readData();
  const index = storedData.playlist.findIndex((item) => item.id === id);

  storedData.playlist[index] = { ...data, id };
  await writeData(storedData);
}

async function deleteProduct(id) {
  const storedData = await readData();
  const updatedData = storedData.products.filter(
    (product) => product.id !== id,
  );

  await writeData({
    playlist: storedData.playlist,
    products: updatedData,
    cart: storedData.cart,
  });
}

async function addProductOrder(id) {
  const storedData = await readData();
  const products = storedData.products;
  const orderedProducts = storedData.cart;
  const newOrderedProduct = products.find((product) => product.id === id);

  orderedProducts.unshift({ ...newOrderedProduct, piece: 1 });
  await writeData({
    ...storedData,
    cart: orderedProducts,
  });
}

async function alreadyOrderedProduct(id) {
  const storedData = await readData();

  return storedData.cart.find((order) => order.id === id);
}

async function deleteProductCart(id) {
  const storedData = await readData();
  const updatedCart = storedData.cart.filter((product) => product.id !== id);

  await writeData({
    ...storedData,
    cart: updatedCart,
  });
}

async function replaceProductCart(id, data) {
  const storedData = await readData();
  const index = storedData.cart.findIndex((item) => item.id === id);

  storedData.cart[index] = { ...data, id };
  await writeData(storedData);
}

async function addOrder(data) {
  const { client, ordered } = data;
  const storedData = await readData();

  storedData.order.unshift({
    client,
    ordered,
  });

 await writeData({ ...storedData, cart: [], order: storedData.order });
}

exports.getAll = getAll;
exports.getProduct = getProduct;
exports.addProduct = addProduct;
exports.deleteProduct = deleteProduct;
exports.addProductOrder = addProductOrder;
exports.alreadyOrderedProduct = alreadyOrderedProduct;
exports.deleteProductCart = deleteProductCart;
exports.replaceProductCart = replaceProductCart;
exports.addOrder = addOrder;
exports.replacePlaylist = replacePlaylist;
