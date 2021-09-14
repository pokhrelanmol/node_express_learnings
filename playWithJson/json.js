const fs = require("fs");
const { resolve } = require("path");
const object = {
  name: "anmol",
  age: 19,
  place: "lingsey",
};
// TODO: create new file
fs.writeFile("data.json", "", (err) => {
  if (!err) {
    console.log("json file created");
  }
});

// TODO: add json data in it
fs.appendFile("data.json", JSON.stringify(object), (err) => {
  if (!err) {
    console.log("added json data to the file");
  }
});
// TODO: read file and get back the data
fs.readFile("data.json", "utf-8", (err, data) => {
  if (!err) {
    // TODO: convert it again to object and log it
    console.log(JSON.parse(data));
  }
});
