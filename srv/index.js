const express = require("express");
var app = express();

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ACCESS_ORIGIN);

  res.header(
    "Access-Control-Allow-Headers",

    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/msg", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected =) ");
  socket.on("disconnect", () => {
    console.log("user disconnected =(");
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message : " + msg);
  });
});

server.listen(port, () => {
  console.log("server running on *: " + port);
});
