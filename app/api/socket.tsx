// pages/api/socket.ts
import { Server } from "socket.io";

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Client connected");

      socket.on("start-broadcast", (data) => {
        console.log(data.message);
        io.emit("broadcast-message", { message: "Broadcast has started!" });
      });

      socket.on("stop-broadcast", (data) => {
        console.log(data.message);
        io.emit("broadcast-message", { message: "Broadcast has stopped!" });
      });
    });
  }
  res.end();
};

export default SocketHandler;
