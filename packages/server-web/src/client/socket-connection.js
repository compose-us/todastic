import io from "./socket.io-bundle.js";

export default function createSocketConnection(eventProcessor) {
  const socket = io({
    autoConnect: false
  });

  socket.on("connection", events => events.forEach(eventProcessor));
  socket.on("event", eventProcessor);
  socket.on("error", err => console.log(err));

  return {
    addTodo(todo) {
      socket.emit("command", { command: "ADD_TODO", data: todo });
    },
    removeTodo(todo) {
      socket.emit("command", { command: "REMOVE_TODO", data: { id: todo.id } });
    },
    connect() {
      socket.open();
    }
  };
}
