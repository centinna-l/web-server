const request = require("request");

const weather = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/880c05ec0ca62d3acb0e31ae863bece5/" +
    latitude +
    "," +
    longitude +
    "?units=si";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the Internet", undefined);
    } else if (response.body.error) {
      callback("Unable to get the weather status.", undefined);
    } else {
      callback(
        undefined,
        "The Temperature is currently " +
          response.body.currently.temperature +
          "° celcius"
      );
    }
  });
};

module.exports = weather;
