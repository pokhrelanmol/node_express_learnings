const http = require("http");
const server = http
  .createServer((req, res) => {
    //     console.log(req.url);
    if (req.url === "/") {
      res.end("this is home");
    } else if (req.url === "/contact") {
      res.end("this is contact");
    } else if (req.url === "/about") {
      res.end("this is about");
    } else {
      res.writeHead(404, { "content-type": "text/html" });
      res.end("this is error");
    }
  })
  .listen(4000, () => {
    console.log("listening in port 4000");
  });
