const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.listen(PORT);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/", (req, res) => {
  const sum = +req.body.input1 / Math.pow(+req.body.input2, 2);
  res.send(`Your BMI is : <h1> ${sum}</h1> `);
});
