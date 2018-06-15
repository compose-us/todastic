const socketIo = require("socket.io");
const createCommandProcessor = require("./command-processor.js");

function createSocketOnServer(httpServer) {
  const io = socketIo(httpServer);
  const { getAllEvents, processCommand } = createCommandProcessor();

  io.on("connection", function(socket) {
    console.log("a user connected");

    getAllEvents().forEach(entry => socket.emit(entry.event, entry.data));

    socket.on("command", processCommand);

    socket.on("disconnect", function() {
      console.log("user disconnected");
    });
  });
}

module.exports = createSocketOnServer;
