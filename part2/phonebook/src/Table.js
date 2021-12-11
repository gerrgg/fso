import React from "react";

const Person = ({ name, number, handleDelete }) => (
  <tr>
    <td>{name}</td>
    <td>{number}</td>
    <td>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleDelete(name);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

const Table = ({ persons, handleDelete }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Number</th>
        <th>Delete?</th>
      </tr>
    </thead>
    <tbody>
      {persons.map(({ name, number }) => (
        <Person
          name={name}
          number={number}
          key={number + name}
          handleDelete={handleDelete}
        />
      ))}
    </tbody>
  </table>
);

export default Table;
