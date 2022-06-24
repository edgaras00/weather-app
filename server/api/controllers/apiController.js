const fetch = require("node-fetch");

exports.getWeatherData = async (req, res) => {
  try {
    const location = req.query.location;
    const API = process.env.API_KEY;
    let baseUrl = "http://api.openweathermap.org/data/2.5/";
    // Current weather API endpoint
    let weatherApi = `weather?q=${location}&units=imperial&appid=${API}`;
    // Weather forecast API endpoint
    let forecastApi = `forecast?q=${location}&units=imperial&appid=${API}`;
    // Complete URL to call API
    const weatherUrl = baseUrl + weatherApi;
    const forecastUrl = baseUrl + forecastApi;

    const response = await fetch(weatherUrl);

    if (!response.ok) {
      throw new Error(
        "Location not found. Please enter a valid location name."
      );
    }
    const weatherData = await response.json();

    // Convert the UNIX time to selected location's current date
    // and time
    const date = new Date((weatherData.dt + weatherData.timezone) * 1000);
    // Set the hour state by extracting hours from the current date
    const hour = date.getUTCHours();
    // setHour(date.getUTCHours());
    // Set current weather data state
    // setCurrentWeatherData([data]);
    // Fetch the 5 day forecast weather data
    const forecastResponse = await fetch(forecastUrl);

    if (!forecastResponse.ok) {
      throw new Error("err");
    }
    const forecastData = await forecastResponse.json();
    // setForecastData(forecastData.list);
    res.status(200).json({
      weatherData,
      forecastData: forecastData.list,
      hour,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
