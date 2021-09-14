const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
require("dotenv").config();
app.use(express.json());
const PORT = process.env.PORT;
app.listen(PORT);

// get
const todos = [];

app.get("/", (req, res) => {
  res.status(200).json({ todos });
  res.send({ todos });
});
// post
app.post("/", (req, res) => {
  const { todo } = req.body;
  if (todo) {
    todos.push(todo);
    console.log(JSON.stringify(todos));
    fs.appendFile("data.json", JSON.stringify(todos), () => {});
    res.status(201).json({ todos });
  } else {
    res.status(404).json({ error: "please provide todo" });
  }
  res.status(201);
});

// delete
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id > todos.length) {
    res.status(400).json({ error: "provide valid id" });
  } else {
    todos.splice(id, 1);
    res.send({ todos });
    res.status(400).json({ todos });
  }
});
// update
app.put("/:id", (req, res) => {
  const { id } = req.params;
  if (id > todos.length) {
    res.status(400).json({ error: "provide valid id" });
  } else {
    const { todo } = req.body;
    todos[id] = todo;
    res.send({ todos });
    res.status(201).json({ todo });
  }
});
