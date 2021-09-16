const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const staticPath = path.join(__dirname, "public");

// app.use(express.static(staticPath));
app.use(express.static(path.join(staticPath, "css")));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(staticPath, "index.html"));
// });

// TODO: set view engine in our case it is hbs
app.set("view engine", "hbs");
// ! by default all view engine search for the dir name "views" where we can do our templating
// !but incase if we want to change the name of directry then below set function is used specifying the function
// ! views directry and the path of the directry we want to replace with
const templatePath = path.join(__dirname, "./template/views");
const partialPath = path.join(__dirname, "./template/partials");
app.set("views", templatePath); //*editing views dir name
hbs.registerPartials(partialPath);

// TODO: create route
app.get("/", (req, res) => {
  res.render("index", {
    buttonText: "clicked",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {});
});
app.get("/contact", (req, res) => {
  res.render("contact", {});
});
app.get("*", (req, res) => {
  res.send("404 error");
});
app.listen(8080);
