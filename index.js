// //Simple web server
// const http = require("http");
// const PORT = 3001;

// let notes = [
//   {
//     id: 1,
//     content: "HTML is Easy",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "Get and Post are the most important methods of HTTP portocol",
//     important: true,
//   },
// ];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Conten-Type": "text/plain" });
//   response.end(JSON.stringify(notes));
// });

// app.listen(PORT);
// console.log(`Server is now running on port ${PORT}`);

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is Easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "Get and Post are the most important methods of HTTP protocol",
    important: true,
  },
];

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234245",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

function generateId(db) {
  const maxId = db.length > 0 ? Math.max(...db.map((note) => note.id)) : 0;
  return maxId + 1;
}

app.get("/", (request, response) => {
  response.send("<h1>Hello, Nodemon!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.status(200).json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const note = notes.find((note) => note.id === id);
  console.log(note);
  response.status(200).json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "contennt missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(notes),
  };

  notes = notes.concat(note);

  response.status(201).json(note);
});

app.put("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const note = notes.find((note) => note.id === id);
  const { content, important } = request.body;

  const updatedNote = {
    ...note,
    content,
    important,
  };

  notes = notes.map((note) => (note.id === id ? updatedNote : note));
  response.status(200).json(updatedNote);
});

// app.get("/api/persons", (request, response) => {
//   response.status(200).json(persons);
// });

// app.get("/info", (request, response) => {
//   response.send(`<p>Phonebook has info for ${persons.length} people</p>`);
// });

// app.get("/api/persons/:id", (request, response) => {
//   const id = parseInt(request.params.id);
//   const person = persons.find((person) => person.id === id);
//   console.log(person);
//   response.status(200).json(person);
// });

// app.delete("/api/persons/:id", (request, response) => {
//   const id = parseInt(request.params.id);
//   persons = persons.filter((person) => person.id !== id);

//   response.status(204).end();
// });

// app.post("/api/persons", (request, response) => {
//   const { name, number } = request.body;

//   if (!name || !number) {
//     return response.status(400).json({
//       error: "name or number is missing",
//     });
//   }

//   const nameExists = persons.some((person) => person.name === name);

//   if (nameExists) {
//     return response.status(400).json({
//       error: "name must be unique",
//     });
//   }

//   const person = {
//     name,
//     number,
//     id: generateId(persons),
//   };

//   persons = persons.concat(person);

//   response.status(201).json(person);
// });

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
