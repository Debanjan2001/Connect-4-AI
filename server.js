const express = require("express");
const app = express();
const http = require('http');
const cors = require('cors');
app.use(cors());

const env = require('dotenv');
env.config();

const PORT = process.env.PORT || 3001;

const socket = require("socket.io");

const server = app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

const io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server" });
});
  
io.on("connection", (socket) => {
    console.log(`Player : ${socket.id} is online`);

    socket.on("join-room", (roomId)=>{
        socket.join(roomId);
        console.log(`Player : ${socket.id} has joined room ${roomId}`);
    });

    socket.on("num-rooms",(roomId)=>{
        const data = io.of("/").adapter.rooms;
        io.to(roomId).emit("all-info",data);
    });

    socket.on(("disconnect"), ()=>{
        console.log("Player Disconnected :" ,socket.id)
    });
});