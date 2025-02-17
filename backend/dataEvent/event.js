const { readData, writeData } = require("../util/getData");

async function getAll() {
  const storedData = await readData();

  if (!storedData) {
    throw Response.json("Could not find any events.");
  }

  return storedData;
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

async function deleteProduct(id) {
  const storedData = await readData();
  const updatedData = storedData.products.filter(
    (product) => product.id !== id,
  );

  await writeData({ products: updatedData });
}

exports.getAll = getAll;
exports.getProduct = getProduct;
exports.deleteProduct = deleteProduct;
