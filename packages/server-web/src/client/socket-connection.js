import io from "./socket.io-bundle.js";

export default function createSocketConnection(eventProcessor) {
  const socket = io();

  socket.on("connection", events => events.forEach(eventProcessor));
  socket.on("event", eventProcessor);

  socket.emit("command", { command: "ADD_TODO", data: { title: "create a nice test todo" } });
}
