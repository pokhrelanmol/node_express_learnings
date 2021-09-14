const path = require("path");
const fs = require("fs");
// new directry created

fs.mkdirSync("anmol");

// creating file

fs.writeFileSync("anmol/anmol.json", "i m new to node js ");
// updating the new  data

fs.appendFileSync("anmol/anmol.json", "i m still new to node js ");

// // read a file data
const data = fs.readFileSync("anmol/anmol.json", "utf-8");
console.log(data);
// // rename the file
fs.renameSync("anmol/anmol.json", "anmol/anmol.txt");
