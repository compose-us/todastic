const socket = io();

socket.on("connection", events => events.forEach(processEvent));
socket.on("event", processEvent);

socket.emit("command", { command: "ADD_TODO", data: { title: "create a nice test todo" } });

function processEvent(event) {
  console.log("processing event", event);
}
