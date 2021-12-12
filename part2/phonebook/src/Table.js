import React from "react";
import Button from "./components/Button";
import styled from "styled-components";

const TableWrapper = styled.table`
  width: 100%;
  max-height: 300px;
  overflow-y: scroll;
`;

const TableCell = styled.td`
  font-size: 17px;
  text-align: center;
  text-transform: capitalize;

  &:first-of-type {
    text-align: left;
  }
`;

const TableHead = styled.th`
  padding: 15px 0;
  font: 700 22px/22px helvetica;

  &:first-of-type {
    text-align: left;
  }
`;

const Person = ({ name, number, handleDelete }) => (
  <tr>
    <TableCell>{name}</TableCell>
    <TableCell>{number}</TableCell>
    <TableCell>
      <Button
        secondary
        onClick={(e) => {
          e.preventDefault();
          handleDelete(name);
        }}
      >
        Delete
      </Button>
    </TableCell>
  </tr>
);

const Table = ({ persons, handleDelete }) => (
  <TableWrapper>
    <thead>
      <tr>
        <TableHead>Name</TableHead>
        <TableHead>Number</TableHead>
        <TableHead>Delete?</TableHead>
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
  </TableWrapper>
);

export default Table;
