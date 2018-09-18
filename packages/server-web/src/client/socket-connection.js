import io from "./socket.io-bundle.js";
import { extractDetails } from "../lib/details-extractor.js";

export default function createSocketConnection(eventProcessor) {
  const socket = io({
    autoConnect: false
  });

  socket.on("connection", events => events.forEach(eventProcessor));
  socket.on("event", eventProcessor);
  socket.on("error", err => console.log(err));

  return {
    addTodo(todo) {
      const { text, labels, trackedTimes } = extractDetails(todo.title);
      socket.emit("command", { command: "ADD_TODO", data: { ...todo, labels, trackedTimes, title: text } });
    },
    removeTodo(todo) {
      socket.emit("command", { command: "REMOVE_TODO", data: { todoId: todo.todoId } });
    },
    changeTodo(todo, changeset) {
      const { text, labels, trackedTimes } = extractDetails(changeset.title);
      socket.emit("command", {
        command: "CHANGE_TODO",
        data: { ...changeset, labels, title: text, trackedTimes, todoId: todo.todoId }
      });
    },
    connect() {
      socket.open();
    }
  };
}
