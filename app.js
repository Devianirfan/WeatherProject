const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "dc0eba5733a13a033cfef684458a4db5";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {
    // console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log(temp);
      const desc = weatherData.weather[0].description;
      console.log(desc);
      const icon = weatherData.weather[0].icon;
      console.log(icon);
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // res.write() doesn't work anymore, don't know why
      res.send(
        `<h3> The weather is currently ${desc} </h3>
        <h1>The temperature in ${query} is ${temp} degrees Celcius</h1>
        <img src="${imageURL}" alt="weather icon">`);

    });
  });
});

app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});
