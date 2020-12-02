const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3ebb060d4b2b6d94c69dc7a4d65ca11b&query=" +
    encodeURIComponent(latitude) +
    " " +
    encodeURIComponent(longitude);

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to fetch weather forecast for your region", undefined);
    } else if (response.body.error) {
      callback(
        "Unable to get weather forecast for that region. Try another search.",
        undefined
      );
    } else {
      const weatherReport =
        response.body.current.weather_descriptions +
        " It is currently " +
        response.body.current.temperature +
        " degress out. There is a " +
        response.body.current.precip +
        "% chance of rain.";
      callback(undefined, weatherReport);
    }
  });
};

module.exports = forecast;
