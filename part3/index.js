const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(cors())

morgan.token("req-body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(morgan(":method :url :status :res[content-length] :req-body :response-time ms"));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Meowington",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.send(persons);
});

app.get("/info", (req, res) => {
  res.send(
    "<p>The phonebook has information on " +
      persons.length +
      " persons.</p>" +
      "<p>" +
      Date() +
      "</p>"
  );
});

app.get("/api/persons/:id", (req, res) => {
  let id = req.params.id;
  let person = persons.find((person) => person.id === id);
  if (person) {
    res.send(person);
  } else {
    res.status(404).send("Person not found");
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.send("Person deleted");
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (body.name && body.number) {
    if (persons.find((person) => person.name === body.name)) {
      res.status(400).send("Name already exists");
      return;
    } else {
      const person = {
        id:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        name: body.name,
        number: body.number,
      };
      persons = persons.concat(person);
      res.send("Person added");
    }
  } else {
    res.status(400).send("Missing name or number");
    return;
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
