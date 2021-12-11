import React, { useEffect, useState } from "react";
import Form from "./Form";
import Results from "./Results";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const results = search.length
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    : countries;

  return (
    <div>
      <h1>Search for countries</h1>
      <Form search={search} setSearch={setSearch} />
      <h2>Results:</h2>
      <Results results={results} setSearch={setSearch} />
    </div>
  );
}

export default App;
