import axios from "axios";
import React, { useEffect, useState } from "react";
import Info from "./Info";
import Weather from "./Weather";

const Country = ({ country, showDetails, setSearch }) => {
  const [weather, setWeather] = useState(null);
  const capital = showDetails ? country.capital[0] : null;

  useEffect(() => {
    const apikey = process.env.REACT_APP_API_KEY;

    if (showDetails) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apikey}&units=imperial`
        )
        .then((response) => {
          setWeather(response.data);
        });
    }
  }, [showDetails]);

  if (showDetails === false) {
    return (
      <div>
        {country.name.common}
        <button
          onClick={() => {
            setSearch(country.name.common);
          }}
        >
          show
        </button>
      </div>
    );
  }

  return (
    <div>
      <Info country={country} />
      <Weather capital={country.capital[0]} weather={weather} />
    </div>
  );
};

const Results = ({ results, setSearch }) => {
  if (!results.length) return <p>No Results :(</p>;

  return results.length > 10 ? (
    <p>Too many results...</p>
  ) : (
    results.map((country) => (
      <Country
        country={country}
        key={country.name.common}
        showDetails={results.length === 1}
        setSearch={setSearch}
      />
    ))
  );
};

export default Results;
