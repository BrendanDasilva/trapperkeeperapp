import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import "../../assets/css/App.css";
import Footer from "../Footer";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric"); // Default unit is metric
  const [unitLabel, setUnitLabel] = useState("C"); // Default label is Celsius

  const apiKey = "4c661b6537901e7e5e33e105230c4e68";

  function handleChange(event) {
    setCity(event.target.value);
  }

  useEffect(() => {
    if (city) {
      getWeather({ preventDefault: () => {} });
    }
  }, [unit]);

  function getWeather(event) {
    event.preventDefault();
    setError("");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        setError("City not found");
      });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`
      )
      .then((response) => {
        const today = new Date().getDate();
        const forecastData = response.data.list.reduce((acc, reading) => {
          const date = new Date(reading.dt_txt);
          const day = date.getDate();
          if (day !== today) {
            const dateString = reading.dt_txt.split(" ")[0];
            if (!acc[dateString]) {
              acc[dateString] = reading;
            } else if (reading.main.temp_max > acc[dateString].main.temp_max) {
              acc[dateString] = reading;
            }
          }
          return acc;
        }, {});
        const sortedForecast = Object.values(forecastData).slice(0, 5);
        setForecast(sortedForecast);
      })
      .catch((error) => {
        setError("City not found");
      });
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const monthDay = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    return { dayOfWeek, monthDay };
  }

  function capitalizeWords(description) {
    return description.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function getWeatherIconUrl(iconCode) {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  function roundTemperature(temp) {
    return Math.round(temp);
  }

  function getRainBarHeight(rainAmount) {
    const maxRain = 50; // Assume 50mm as the maximum for illustration purposes
    return Math.min((rainAmount / maxRain) * 100, 100); // Ensure it does not exceed 100%
  }

  function toggleUnit() {
    if (unit === "metric") {
      setUnit("imperial");
      setUnitLabel("F");
    } else {
      setUnit("metric");
      setUnitLabel("C");
    }
  }

  return (
    <div className="full-page-container">
      <Navbar />
      <div className="weather-app">
        <h1>Weather</h1>
        {weather && (
          <div className="unit-toggle">
            <span className={unitLabel === "C" ? "active" : ""}>C</span>
            <label className="switch">
              <input type="checkbox" onChange={toggleUnit} />
              <span className="slider"></span>
            </label>
            <span className={unitLabel === "F" ? "active" : ""}>F</span>
          </div>
        )}
        <form onSubmit={getWeather}>
          <input
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Enter city"
            className="weather-input"
          />
          <button type="submit" className="weather-button">
            Get Weather
          </button>
        </form>
        {error && <p className="weather-error">{error}</p>}
        {weather && (
          <div className="current-weather">
            <h2>{weather.name}</h2>
            <img
              src={getWeatherIconUrl(weather.weather[0].icon)}
              alt={weather.weather[0].description}
              className="weather-icon"
            />
            <p>{capitalizeWords(weather.weather[0].description)}</p>
            <p className="temperature">
              {roundTemperature(weather.main.temp)}°{unitLabel}
            </p>
            <p>
              Feels Like: {roundTemperature(weather.main.feels_like)}°
              {unitLabel}
            </p>
            <p>Humidity: {weather.main.humidity}%</p>
            {weather.rain && weather.rain["1h"] && (
              <>
                <p>Rain: {weather.rain["1h"]} mm</p>
                <div
                  className="rain-bar"
                  style={{ height: `${getRainBarHeight(weather.rain["1h"])}%` }}
                ></div>
              </>
            )}
          </div>
        )}
        {forecast.length > 0 && (
          <div className="weather-forecast">
            {forecast.map((day, index) => (
              <div key={index} className="weather-forecast-item">
                <p className="day-of-week">
                  {formatDate(day.dt_txt).dayOfWeek}
                </p>
                <p className="month-day">{formatDate(day.dt_txt).monthDay}</p>
                <div className="separator"></div>
                <img
                  src={getWeatherIconUrl(day.weather[0].icon)}
                  alt={day.weather[0].description}
                  className="weather-icon"
                />
                <p>{capitalizeWords(day.weather[0].description)}</p>
                <p className="temperature">
                  {roundTemperature(day.main.temp_max)}°{unitLabel}
                </p>
                <p>
                  Feels Like: {roundTemperature(day.main.feels_like)}°
                  {unitLabel}
                </p>
                <p>Humidity: {day.main.humidity}%</p>
                {day.rain && day.rain["3h"] && (
                  <>
                    <p>Rain: {day.rain["3h"]} mm</p>
                    <div
                      className="rain-bar"
                      style={{ height: `${getRainBarHeight(day.rain["3h"])}%` }}
                    ></div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <div id="map" className="weather-map"></div> */}
    </div>
  );
}

export default WeatherApp;
