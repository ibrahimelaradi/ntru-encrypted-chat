import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Room } from "./types/Room";

const rooms: Room[] = [];

const app = express();
const http = createServer(app);
const io = new Server(http, {
  path: "/chat",
});

app.get("/rooms", (req, res) => {
  console.log("Getting rooms");
  res.status(200).json(rooms);
});

io.on("connection", (socket: Socket) => {
  console.log("Connection with id", socket.id);
  socket.on("roomjoin", (name: string) => {
    console.log(`Attempt to join room with name ${name} from ${socket.id}`);
    if (rooms.some((room) => room.name === name)) {
      socket.join(name);
      socket.emit("roomjoined", name);
    } else {
      rooms.push({ name: name });
      socket.join(name);
      socket.emit("roomjoined", name);
    }
  });
  socket.on("message", (room: string, message: string) => {
    console.log("Received message", message);
    if (rooms.some((x) => x.name === room)) {
      io.to(room).emit("message", socket.id, message);
    } else {
      socket.emit(
        "message-err",
        "Room does not exist, please restart the system"
      );
    }
  });
  socket.emit("connected", socket.id);
});

http.listen(3000, () => {
  console.log("Server listening on http://localhost:3000/ 🚀");
});
