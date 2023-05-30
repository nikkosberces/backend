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
const app = express();
const PORT = 3001;

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

function generateId() {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
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
    id: generateId(),
  };

  notes = notes.concat(note);

  response.status(201).json(note);
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
