import axios from "axios";
import React, { useEffect, useState } from "react";

const Weather = ({ capital, weather }) => {
  const feels_like = weather !== null ? weather.main.feels_like : null;
  const icon = weather !== null ? weather.weather[0].icon : null;
  const windSpeed = weather !== null ? weather.wind.speed : null;
  const windDirection = weather !== null ? weather.wind.deg : null;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Feels like {feels_like}</p>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
      <p>
        <strong>wind:</strong>
        <span>
          {windSpeed} mph direction {windDirection}
        </span>
      </p>
    </div>
  );
};

export default Weather;
