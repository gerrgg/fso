import React from "react";

const Form = ({ search, setSearch }) => (
  <>
    <input onChange={({ target }) => setSearch(target.value)} value={search} />
    <button
      onClick={() => {
        setSearch("");
      }}
    >
      clear
    </button>
  </>
);

export default Form;
