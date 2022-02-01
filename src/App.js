import React, { useState, useEffect } from "react";
import CurrentWeather from "./Components/CurrentWeather";
import Forecast from "./Components/Forecast";
import icon from "./images/search.png";

const App = () => {
  const API = process.env.REACT_APP_API_KEY;
  const [searchLocation, setSearchLocation] = useState("");
  const [currentWeatherData, setCurrentWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [hour, setHour] = useState(null);

  const fetchData = async (location, apiKey) => {
    try {
      let baseUrl = "http://api.openweathermap.org/data/2.5/";
      // Current weather API endpoint
      let weatherApi = `weather?q=${location}&units=imperial&appid=${apiKey}`;
      // Weather forecast API endpoint
      let forecastApi = `forecast?q=${location}&units=imperial&appid=${apiKey}`;
      // Complete URL to call API
      const weatherUrl = baseUrl + weatherApi;
      const forecastUrl = baseUrl + forecastApi;

      // Fetch current weather data
      const response = await fetch(weatherUrl);
      if (!response.ok) {
        alert("Location not found. Please enter a valid location name.");
        throw new Error("err");
      }
      const data = await response.json();
      // Convert the UNIX time to selected location's current date
      // and time
      const date = new Date((data.dt + data.timezone) * 1000);
      // Set the hour state by extracting hours from the current date
      setHour(date.getUTCHours());
      // Set current weather data state
      setCurrentWeatherData([data]);

      // Fetch the 5 day forecast weather data
      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok) {
        throw new Error("err");
      }
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData.list);
    } catch (err) {
      console.log(err);
      // If user submits an invalid location, keep previous state
      setCurrentWeatherData((prevData) => prevData);
    }
  };

  // Get weather data from one of the provided locations in the array
  // after first render
  useEffect(() => {
    // Array of locations
    const cities = [
      "New+York",
      "Los+Angeles",
      "Sydney",
      "Miami",
      "London",
      "Paris",
      "Moscow",
      "Tokyo",
      "Seoul",
      "Beijing",
      "Hong Kong",
      "Toronto",
      "Vilnius",
      "Klaipeda",
    ];
    // Pick a random location from the array
    const queryCity = cities[Math.floor(Math.random() * cities.length)];
    // Fetch the weather data for selected location
    fetchData(queryCity, API);
  }, [API]);

  // Function to handle user's location input
  // Set searchLocation state as the input value
  const handleChange = (event) => {
    const { value } = event.target;
    setSearchLocation(value);
  };

  // Function to submit user's query by clicking the search icon
  const handleSubmit = (location) => {
    // submitSearch(weatherUrl, forecastUrl);
    fetchData(location, API);
  };

  // Function to submit user's query by pressing the Return key
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      // submitSearch(weatherUrl, forecastUrl);
      fetchData(searchLocation, API);
    }
  };

  // Create current weather component that is going to be rendered
  const weatherComponents = currentWeatherData.map((item, index) => (
    <CurrentWeather
      key={index.toString() + item.id.toString()}
      location={item.name}
      temperature={item.main.temp}
      description={item.weather[0].description}
      iconId={item.weather[0].icon}
      humidity={item.main.humidity}
      wind={item.wind.speed}
      tempMin={item.main.temp_min}
      tempMax={item.main.temp_max}
      feelsLike={item.main.feels_like}
      time={item.timezone}
      dt={item.dt}
    />
  ));

  // Change the background image according to the searched location's
  // time (night or day)
  let timeClass = "";
  if (hour >= 6 && hour < 20) {
    timeClass = "day";
  } else {
    timeClass = "night";
  }

  // If forecast data is not present, return null
  if (forecastData.length === 0) {
    return null;
  }

  return (
    <div className="app">
      <div className={`weather-container ${timeClass}`}>
        <div className="searchbar">
          <input
            type="text"
            placeholder="City"
            name="searchLocation"
            value={searchLocation}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={() => handleSubmit(searchLocation)}
            className="submit"
          >
            <img src={icon} width="14px" height="13px" alt="search" />
          </button>
        </div>
        {weatherComponents}
        <Forecast
          data={forecastData}
          time={currentWeatherData[0].dt}
          timezone={currentWeatherData[0].timezone}
        />
      </div>
    </div>
  );
};

export default App;
