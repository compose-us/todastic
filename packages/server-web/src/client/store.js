import { replay } from "@todastic/storage-events";

// TODO get Todos and not expose whole store!!
export const store = { todos: [], isAuthenticated: false };

const allEvents = [];

export function processEvent(event) {
  console.log(new Date(), "processing event", event);
  allEvents.push(event);
  store.todos = replay(allEvents).todos;
  console.log("new store.todos.length", store.todos.length);
}

export function setAuthenticated(status) {
  if (status === false || status === true) {
    store.isAuthenticated = status;
  }
}
export function logout() {
  store.isAuthenticated = false;
}
export function isAuthenticated() {
  return store.isAuthenticated;
}
