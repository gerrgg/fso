import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "./Form";
import Table from "./Table";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setNewSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = () => {
    const newPerson = { name: newName, number: newNumber };

    personService.create(newPerson).then((person) => {
      setPersons(persons.concat(person));
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

      personService.update(match.id, updatedPerson).then((returnedNote) => {
        setPersons(
          persons.map((person) =>
            person.id !== match.id ? person : updatedPerson
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

    // reset input state
    setNewName("");
  };

  const handleDelete = (name) => {
    const result = window.confirm(`Are you sure you want to delete ${name}?`);

    if (result) {
      const personToBeDeleted = persons.find((p) => p.name === name);

      if (personToBeDeleted) {
        personService.remove(personToBeDeleted.id).then((id) => {
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
    <div>
      <h2>Search</h2>
      <input onChange={(e) => handleNewSearch(e)} value={search} />
      <h2>Phonebook</h2>
      <Form
        handleSubmit={handleSubmit}
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      {!peopleToShow.length && search.length ? (
        <p>No results...</p>
      ) : (
        <Table persons={peopleToShow} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
