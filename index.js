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
    content: "Get and Post are the most important methods of HTTP portocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello, Express</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
