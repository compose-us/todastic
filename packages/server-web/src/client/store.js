import { replay } from "@todastic/storage-events";

export const store = { todos: [] };

const allEvents = [];

export function processEvent(event) {
  console.log(new Date(), "processing event", event);
  allEvents.push(event);
  store.todos = replay(allEvents).todos;
  console.log("new store.todos.length", store.todos.length);
}
