/**
 * Slugify - read more or refreshment
 * 'https://www.npmjs.com/package/slugify'
 */

const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTempOverview = require("./modules/replaceTempOverview");
const templateOverview = fs.readFileSync(
  `${__dirname}/1-node-farm/final/templates/template-overview.html`,
  "utf-8",
);
const templateCard = fs.readFileSync(
  `${__dirname}/1-node-farm/final/templates/template-card.html`,
  "utf-8",
);
const templateProduct = fs.readFileSync(
  `${__dirname}/1-node-farm/final/templates/template-product.html`,
  "utf-8",
);
const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const productData = JSON.parse(data);

console.log(productData.map((i) => slugify(i.productName, { lower: true })));

const server = http.createServer((req, res) => {
  const pathName = req.url;
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const htmlData = productData.map((el) =>
      replaceTempOverview(templateCard, el),
    );
    const outputData = templateOverview.replace("{%PRODUCT_CARDS%}", htmlData);

    res.end(outputData);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });

    const product = productData[query.id];
    const outputProductDetail = replaceTempOverview(templateProduct, product);

    res.end(outputProductDetail);
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404);
    res.end("Page was not founded, sorry");
  }
});

const port = process.env.PORT || 4040;

server.listen(4040, () => {
  console.log(`Server is running on port ${port}`);
});
