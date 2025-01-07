const { readData, writeData } = require("../util/getData");

async function getAll() {
  const storedData = await readData();

  if (!storedData) {
    throw Response.json("Could not find any events.");
  }

  return storedData;
}

exports.getAll = getAll;
