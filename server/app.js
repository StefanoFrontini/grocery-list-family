const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require("../utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const mongoose = require("mongoose");
require("dotenv/config");
const consola = require("consola");

//Import Routes
const messagesRoute = require("./routes/messages");

//Comment

//Middleware
app.use(express.json());
app.use("/messages", messagesRoute);

//ROUTES
/* app.get("/api", (req, res) => {
  res.send("We are on api");
}); */

//Connect to DB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() =>
    consola.ready({
      message: "Connected to DB!",
      badge: true
    })
  )
  .catch(err =>
    console.log(`Could not connect to DB ${process.env.DB_CONNECTION}`, err)
  );

// Run when client connects
io.on("connection", socket => {
  socket.on("joinRoom", data => {
    const user = userJoin(socket.id, data.username, data.room);
    socket.join(user.room);
    // Welcome current user
    socket.emit("message", "Welcome to grocery list");
    socket.emit("user", { username: user.username });
    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit("message", `User ${user.username} has joined the chat`);

    // Send users and room info

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for messageToServer
  socket.on("messageToServer", data => {
    const user = getCurrentUser(socket.id);
    console.log(`Message received from ${user.username}: ${data}`);
    io.to(user.room).emit("message", `User ${user.username} said: ${data}`);
  });
  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    console.log("disconnect-User:", user);
    if (user) {
      //socket.leave(user.room);
      console.log(`User ${user.username} has left the chat`);
      io.to(user.room).emit(
        "message",
        `User ${user.username} has left the chat`
      );
      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
  // Runs when client leaves the room
  socket.on("leftChat", () => {
    const user = userLeave(socket.id);
    if (user) {
      //socket.leave(user.room);
      console.log(`User ${user.username} has left the room`);
      io.to(user.room).emit(
        "message",
        `User ${user.username} has left the room`
      );
      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

module.exports = {
  app,
  server
};
