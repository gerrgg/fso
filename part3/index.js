const express = require("express");
const app = express();

app.use(express.json());

let people = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `Phonebook has info for ${people.length} people <br><br> ${date.toString()}`
  );
});

app.get("/api/people", (request, response) => {
  response.json(people);
});

app.get("/api/people/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = people.find((person) => person.id === id);

  return person ? response.json(person) : response.status(204).end();
});

app.delete("/api/people/:id", (request, response) => {
  const id = Number(request.params.id);
  people = people.filter((person) => person.id !== id);

  console.log(people);
  response.status(204).end();
});

const generateID = () => {
  const id = people.length > 0 ? Math.max(...people.map((n) => n.id)) : 0;
  return id + 1;
};

app.post("/api/people", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    response.status(400).json({
      error: "name and number is required",
    });
  }

  const person = {
    id: generateID(),
    name: body.name,
    number: body.number,
  };

  people = people.concat(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
