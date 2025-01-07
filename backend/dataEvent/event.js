const { readData, writeData } = require("../util/getData");

async function getAll() {
  const storedData = await readData();

  if (!storedData) {
    throw Response.json("Could not find any events.");
  }

  return storedData;
}
async function deleteProduct(id) {
  const storedData = await readData();
  const updatedData = storedData.products.filter(
    (product) => product.id !== id.toString(),
  );

  await writeData({ products: updatedData });
}

exports.getAll = getAll;
exports.deleteProduct = deleteProduct;
