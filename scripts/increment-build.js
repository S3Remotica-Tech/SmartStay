const fs = require("fs");
const path = require("path");

const env = process.argv[2]; // dev | qa | prod

const filePath = path.join(__dirname, "../build.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

if (!data[env]) {
  data[env] = 0;
}

data[env]++;

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
