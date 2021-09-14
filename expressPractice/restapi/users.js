const { json } = require("express");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqId = require("uniqid");
const users = [
  {
    firstName: "anmol",
    lastName: "pokhrel",
    age: 19,
    id: uniqId(),
  },
  {
    firstName: "hiran",
    lastName: "daudl",
    age: 29,

    id: uniqId(),
  },
];
router.get("/", (req, res) => {
  fs.readFile("userdata.json", "utf-8", (err, data) => {
    if (data) {
      res.send(data);
      console.log("data dispatched");
    } else {
      fs.writeFileSync("userdata.json", JSON.stringify(users));
      console.log("data dispatched");
    }
  });
});
router.post("/", (req, res) => {
  const user = req.body;
  const userWithId = { ...user, id: uniqId() };
  users.push(userWithId);
  res.send(
    `user with the name ${user.firstName} ${user.lastName} added to the database`
  );
  fs.writeFile(
    "userdata.json",
    JSON.stringify([...users, userWithId]),
    (req, res) => {
      console.log("data posted");
    }
  );
});

// copy id as a params and get the indivisual user
router.get("/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("userdata.json", "utf-8", (err, data) => {
    const foundUser = JSON.parse(data).find((user) => user.id === id);
    res.send(foundUser);
  });
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("userdata.json", "utf-8", (err, data) => {
    JSON.parse(data).filter((user) => user.id !== id);

    res.send(`user with id ${id} deleted`);
  });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  fs.readFile("userdata.json", "utf-8", (err, data) => {
    JSON.parse(data).map((user) => {
      if (user.id === id) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
      }
    });
    res.send(`user with the id ${id} update`);
  });
});

module.exports = router;
