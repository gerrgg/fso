import React from "react";

const Info = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>captial - {country.capital[0]}</p>
    <p>population - {country.population}</p>
    <h2>Languages</h2>
    <ul>
      {Object.keys(country.languages).map((key) => {
        return <li key={key}>{country.languages[key]}</li>;
      })}
    </ul>
    <img src={country.flags.png} />
  </div>
);

export default Info;
