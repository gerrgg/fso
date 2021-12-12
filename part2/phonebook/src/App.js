import axios from "axios";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Form from "./Form";
import Table from "./Table";
import personService from "./services/persons";
import Input from "./components/Input";
import Notification from "./Notification";

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 25px 50px;
  box-sizing: border-box;
  background: #333;
  color: #f7f7f7;
`;

const Heading = styled.h2`
  font: 700 36px/42px helvetica;
  margin-bottom: 0.5rem;
`;

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setNewSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const setNotification = (message) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  const addPerson = () => {
    const newPerson = { name: newName, number: newNumber };

    personService.create(newPerson).then((person) => {
      setPersons(persons.concat(person));
      setNotification(`${person.name} added!`);
      setNewName("");
      setNewNumber("");
    });
  };

  const updatePerson = (match) => {
    const result = window.confirm(
      `${newName} is already in the phonebook - do you want to update number from ${match.number} to ${newNumber}?`
    );

    if (result) {
      const updatedPerson = { ...match, number: newNumber };

      personService.update(match.id, updatedPerson).then((returnedPerson) => {
        setNotification(`${returnedPerson.name} updated!`);

        setPersons(
          persons.map((person) =>
            person.id !== match.id ? person : returnedPerson
          )
        );
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // no blanks
    if (newName === "") return;

    // get matches
    const match = persons.find((p) => p.name === newName);

    // no match, create else update
    !match ? addPerson() : updatePerson(match);
  };

  const handleDelete = (name) => {
    const result = window.confirm(`Are you sure you want to delete ${name}?`);

    if (result) {
      const personToBeDeleted = persons.find((p) => p.name === name);

      if (personToBeDeleted) {
        personService
          .remove(personToBeDeleted.id)
          .then((id) => {
            setPersons(persons.filter((p) => p.id !== personToBeDeleted.id));
            setNotification(`${personToBeDeleted.name} deleted!`);
          })
          .catch((error) => {
            setNotification(
              `${personToBeDeleted.name} has already been removed from the server!`
            );
            setPersons(persons.filter((p) => p.id !== personToBeDeleted.id));
          });
      }
    }
  };

  const handleNewNameChange = ({ target }) => setNewName(target.value);
  const handleNewNumberChange = ({ target }) => setNewNumber(target.value);
  const handleNewSearch = ({ target }) => setNewSearch(target.value);

  const peopleToShow =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );

  return (
    <Wrapper>
      <Notification message={errorMessage} />
      <Heading>Search</Heading>
      <Input onChange={(e) => handleNewSearch(e)} value={search} />
      <Heading>Add Person</Heading>
      <Form
        handleSubmit={handleSubmit}
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
      />
      <Heading>People</Heading>
      {!peopleToShow.length && search.length ? (
        <p>No results...</p>
      ) : (
        <Table persons={peopleToShow} handleDelete={handleDelete} />
      )}
    </Wrapper>
  );
};

export default App;
