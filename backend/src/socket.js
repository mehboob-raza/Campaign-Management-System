const { Server } = require("socket.io");

let io;

exports.initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Client connected");
  });
};

exports.sendAlert = (data) => {
  if (io) io.emit("alert", data);
};