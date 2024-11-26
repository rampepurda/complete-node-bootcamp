const router = require("url"); // in progress - need to change Module
const fs = require("fs");
const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const productData = JSON.parse(data);

router.get("/toDoList", async (req, res) => {
  const dataApi = await getAllTodo();
  res.json({ toDos: dataApi.toDos });
});

module.exports = router;
