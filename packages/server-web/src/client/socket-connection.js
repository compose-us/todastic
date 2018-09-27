import io from "./socket.io-bundle.js";
import { extractDetails } from "../lib/details-extractor.js";

export default function createSocketConnection(eventProcessor) {
  const socket = prepareSocket(eventProcessor);

  return {
    addTodo(todo) {
      const { text, labels, trackedTimes } = extractDetails(todo.title);
      socket.emit("command", { command: "ADD_TODO", data: { ...todo, labels, trackedTimes, title: text } });
    },
    removeTodo(todo) {
      socket.emit("command", { command: "REMOVE_TODO", data: { todoId: todo.todoId } });
    },
    changeTodo(todo, changeset) {
      const data = prepareChangeData(todo, changeset);
      socket.emit("command", {
        command: "CHANGE_TODO",
        data
      });
    },
    moveTodo(todo, changeset) {
      socket.emit("command", { command: "MOVE_TODO", data: { todoId: todo.todoId, ...changeset } });
    },
    connect() {
      socket.open();
    },
    changePassword(newPassword) {
      socket.emit("command", {
        command: "CHANGE_PASSWORD",
        newPassword
      });
    }
  };
}

function prepareSocket(eventProcessor) {
  const socket = io({
    autoConnect: false
  });

  socket.on("connection", events => events.forEach(eventProcessor));
  socket.on("event", eventProcessor);
  socket.on("error", err => console.log(err));

  return socket;
}

function prepareChangeData(todo, changeset) {
  let data = { ...changeset, todoId: todo.todoId };
  if (changeset.title) {
    const { text, labels, trackedTimes } = extractDetails(changeset.title);
    data = { ...data, labels, title: text, trackedTimes };
  }
  return data;
}
