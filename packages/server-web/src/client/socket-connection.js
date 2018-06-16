import io from "./socket.io-bundle.js";

export default function createSocketConnection() {
  const socket = io();

  socket.on("connection", events => events.forEach(processEvent));
  socket.on("event", processEvent);

  socket.emit("command", { command: "ADD_TODO", data: { title: "create a nice test todo" } });

  function processEvent(event) {
    console.log(new Date(), "processing event", event);
  }
}
