const fs = require("fs");

function saveMergedSwagger(swagger) {
  fs.writeFileSync("../src/result.json", JSON.stringify(swagger), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function readFile(path) {
  const data = fs.readFileSync(path, {
    encoding: "utf8",
    flag: "r",
  });

  return JSON.parse(data);
}
console.log(process);
const files = ["../mass.json", "../certification.json"];
let paths = {};
let schemas = {};

const swaggerRoot = readFile("./swagger-root.json");



files.forEach((file) => {
  const fileJson = readFile(file);
  paths = { ...paths, ...fileJson.paths };
  schemas = { ...schemas, ...fileJson.components.schemas };
});

swaggerRoot.paths = paths;
swaggerRoot.components.schemas = schemas;
swaggerRoot.info["x-logo"] = {
  url: "https://redocly.github.io/redoc/petstore-logo.png",
  altText: "Test Logo",
};

saveMergedSwagger(swaggerRoot);
