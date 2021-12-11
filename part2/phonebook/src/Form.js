import React, { useState } from "react";

const Form = ({
  handleSubmit,
  handleNewNameChange,
  handleNewNumberChange,
  newName,
  newNumber,
}) => (
  <form onSubmit={(e) => handleSubmit(e)}>
    <div>
      name: <input onChange={(e) => handleNewNameChange(e)} value={newName} />
    </div>
    <div>
      phone:
      <input onChange={(e) => handleNewNumberChange(e)} value={newNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default Form;
