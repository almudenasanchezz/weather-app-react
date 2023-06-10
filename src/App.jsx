import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "TU_CLAVE_API";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=23d52a37d57e485283d180457231006&q=${city}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city, apiKey]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter location"
        />
      </div>
      {weatherData && (
        <div className="container">
          <div className="top">
            <div className="location">
              <h2>{weatherData.location.name}</h2>
            </div>
            <div className="temp">
              <p className="temp__text bold">{weatherData.current.temp_c}°C</p>
            </div>
            <div className="description">
              <p>{weatherData.current.condition.text}</p>
            </div>
          </div>

          <div className="bottom">
            <div className="humidity">
              <p>
                <strong>Humidity</strong>
                <br />
                {weatherData.current.humidity}%
              </p>
            </div>
            <div className="feels">
              <p>
                <strong>Feels like</strong>
                <br />
                {weatherData.current.feelslike_c}°C
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
