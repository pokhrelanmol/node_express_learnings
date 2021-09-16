const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const PORT = process.env.PORT;
import http from "http";
const server = http.createServer().listen(PORT);
console.log(`app running on  http://localhost:${PORT}`);
server.on("request", (req, res) => {
  // TODO:  fetching data using old way without streaming
  //   fs.readFile("input.txt", "utf-8", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  // TODO:  FETCHING DATA USING STREAM

  // const stream = fs.createReadStream("input.txt");
  // reading data if available NOTE:"data is builtIn"
  // stream.on("data", (chunkData) => {
  //   res.write(chunkData);
  // });
  //   if data finished then the end get fired
  //   stream.on("end", () => {
  //     res.end();
  //   });

  //   stream.on("error", (err) => {
  //     console.log(err);
  //     res.end("error in file check it");
  //   });

  // TODO:  fetch and display data simply using pipes

  const stream = fs.createReadStream("input.txt");
  stream.pipe(res);
});
