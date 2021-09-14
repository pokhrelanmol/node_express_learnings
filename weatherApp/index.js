const http = require("http");
const fs = require("fs");
const requests = require("requests");
const homePage = fs.readFileSync("home.html", "utf-8");

const converToCelcius = (feh) => {
  const celcius = ((feh - 32) * 5) / 9;
  return Math.round((celcius + Number.EPSILON) * 100) / 100;
};

const replaceValues = (temporaryValue, originalValue) => {
  let temperature = temporaryValue.replace(
    "{%temperature%}",
    converToCelcius(originalValue.main.temp)
  );
  temperature = temperature.replace("{%city%}", originalValue.name);
  temperature = temperature.replace("{%country%}", originalValue.sys.country);
  temperature = temperature.replace(
    "{%min%}",

    converToCelcius(originalValue.main.temp_min)
  );
  temperature = temperature.replace(
    "{%max%}",

    converToCelcius(originalValue.main.temp_max)
  );
  temperature = temperature.replace(
    "{%temperatureStatus%}",
    originalValue.weather[0].main
  );
  return temperature;
};
http
  .createServer((req, res) => {
    if (req.url === "/") {
      res.setHeader("Content-Type", "text/html");

      requests(
        "https://api.openweathermap.org/data/2.5/weather?q=kalimpong&appid=3f3da40aea4afd8d80b66eaba75a2ffd"
      )
        .on("data", (chunk) => {
          const convertToObject = JSON.parse(chunk);
          const arrOfObj = [convertToObject];
          const realTimeData = arrOfObj
            .map((val) => {
              return replaceValues(homePage, val);
            })
            .join("");
          console.log(realTimeData);
          res.write(realTimeData);
        })
        .on("end", (err) => {
          if (err) return console.log("connection closed due to errors", err);
          res.end();
        });
    }
  })
  .listen(8080);
