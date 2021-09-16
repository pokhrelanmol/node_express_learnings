const express = require("express");
const router = require("./users");
const app = express();
app.listen(3001);
app.use(express.json());
// TODO: create api with crud
app.use("/users", router);
app.get("/", (req, res) => {
  res.send("this is homepage");
});
app.get;
