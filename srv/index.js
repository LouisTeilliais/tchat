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
const mongoose = require("mongoose");
const mongoDB = 'mongodb+srv://Louis:synology@cluster0.zapuf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
console.log("BDD connected");

const newMessage = new mongoose.Schema({
  msg:{
    type:String,
    required:true
  } 
});

const Msg = mongoose.model('msg', newMessage);
module.exports = Msg;

app.get("/msg", ( _ , res) => {
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
    const message = new Msg({msg})
    
    message.save().then(()=> {
      io.emit("chat message", msg);
      console.log("message : " + msg);
      socket.emit('messsage', "Hello World !" );
    });
    
    // Msg.find().then(result =>{

    //   socket.emit("new-messages", result)
    // });
    // socket.on("new-messages", msg => {
    //   console.log(msg);
    // });
 
  });
});

server.listen(port, () => {
  console.log("server running on *: " + port);
});
