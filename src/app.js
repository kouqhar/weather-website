const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const PORT = process.env.PORT || 5000;

// Load utils
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const newUser = {
  name: "duniya naphtali",
  age: 25,
  school: "B.Sc",
};

// Set the views location and handlebars engine
app.set("view engine", "hbs");
// Customize the view engine
app.set("views", path.join(__dirname, "../templates/views"));
// Customize the view engine for partials
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

// Serve up static file
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    name: "Duniya Naphtali",
    title: "Homepage, welcome to the index page!!!",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Duniya Naphtali",
    title: "About page, welcome to the about page!!!",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message:
      "lorem this message was uncovered yesterday in the midnight around the box of chocolates in my room so get ready to search for it!!!",
    title: "Help page, welcome to the help page!!!",
    name: "Duniya Naphtali",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) return res.send({ error: "Please provide a valid query!" });

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({
        forecast: forecastData,
        location: location,
      });
    });
  });
});

// 404 handler
app.get("/help/*", (req, res) => {
  res.render("errorPage", {
    title: "Article not Found page",
    name: "Duniya Naphtali",
    errorMessage: "Help, article not found!!!",
  });
});

app.get("*", (req, res) => {
  res.render("errorPage", {
    title: "Error Page does not exist!!!",
    name: "Duniya Naphtali",
    errorMessage: "My 404 page!!!",
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
