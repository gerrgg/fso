import React, { useState } from "react";
import Input from "./components/Input";
import Button from "./components/Button";

const Form = ({
  handleSubmit,
  handleNewNameChange,
  handleNewNumberChange,
  newName,
  newNumber,
}) => (
  <form onSubmit={(e) => handleSubmit(e)}>
    <div>
      <Input
        onChange={(e) => handleNewNameChange(e)}
        value={newName}
        placeholder="Name"
      />
    </div>
    <div>
      <Input
        onChange={(e) => handleNewNumberChange(e)}
        value={newNumber}
        placeholder="Number"
      />
    </div>
    <div>
      <Button type="submit">Submit</Button>
    </div>
  </form>
);

export default Form;
