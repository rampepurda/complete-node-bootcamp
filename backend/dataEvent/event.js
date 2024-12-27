//const { v4: generateId } = require("uuid");
const { readData, writeData } = require("../util/getData");

async function getAll() {
  const storedData = await readData();

  if (!storedData) {
    throw new Error("Could not find any events.");
  }
  return storedData;
}

exports.getAll = getAll;
