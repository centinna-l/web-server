const hbs = require("hbs");
const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather_api");

const app = express();

console.log(__dirname);
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index.hbs", {
    title: "Hello World, this is the weather application",
    author: "Made by Jerry"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error:
        "Atleast give the name if the city, for which your looking the temperature"
    });
  }
  console.log(req.query);

  geocode(
    req.query.location,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
      weather(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error
          });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.location
        });
      });
    }
  );

  // res.send({
  //   products: []
  // });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    title: "About"
  });
});
app.get("/help", (req, res) => {
  res.render("help.hbs", {
    title: "Help"
  });
});
app.get("/json", (req, res) => {
  res.send({
    title: "JSON",
    parameter: "object",
    type: {
      source: "nodejs",
      textEditor: "Vs code"
    }
  });
});
app.get("*", (req, res) => {
  res.render("error.hbs");
});
app.listen(3000, () => {
  console.log("Port active and running on port 3000");
});
