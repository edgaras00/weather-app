import React, { useState, useEffect } from "react";

import CurrentWeather from "./Components/CurrentWeather";
import Forecast from "./Components/Forecast";

import icon from "./images/search.png";

const App = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [currentWeatherData, setCurrentWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [hour, setHour] = useState(null);

  const fetchData = async (location) => {
    try {
      let url = `https://weather-api.onrender.com/api/weather?location=${location}`;
      if (process.env.REACT_APP_ENV === "development") {
        url = `/api/weather?location=${location}`;
      }
      const response = await fetch(url);

      if (!response.ok) {
        alert("Location not found. Please enter a valid location name.");
        throw new Error("err");
      }
      const data = await response.json();
      setHour(data.hour);
      setCurrentWeatherData([data.weatherData]);
      setForecastData(data.forecastData);
    } catch (err) {
      console.log(err);
      // If user submits an invalid location, keep previous state
      setCurrentWeatherData((prevData) => prevData);
    }
  };

  // Get weather data from one of the provided locations in the array
  // after first render
  useEffect(() => {
    // Pick a random location from the array
    const queryCity = "New+York";
    // Fetch the weather data for selected location
    fetchData(queryCity);
  }, []);

  // Function to handle user's location input
  // Set searchLocation state as the input value
  const handleChange = (event) => {
    const { value } = event.target;
    setSearchLocation(value);
  };

  // Function to submit user's query by clicking the search icon
  const handleSubmit = (location) => {
    // submitSearch(weatherUrl, forecastUrl);
    fetchData(location);
  };

  // Function to submit user's query by pressing the Return key
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      // submitSearch(weatherUrl, forecastUrl);
      fetchData(searchLocation);
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
