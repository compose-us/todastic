const socketIo = require("socket.io");
const createCommandProcessor = require("./command-processor.js");

function createSocketOnServer(httpServer) {
  const io = socketIo(httpServer);
  const { getAllEvents, processCommand } = createCommandProcessor();

  io.on("connection", function(socket) {
    console.log("a user connected");

    getAllEvents().forEach(event => socket.emit("event", event));

    socket.on("command", command => {
      console.log("command", command);
      processCommand(e => socket.emit("event", e))(command);
    });

    socket.on("disconnect", function() {
      console.log("user disconnected");
    });
  });
}

module.exports = createSocketOnServer;
