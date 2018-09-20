import { replay } from "@todastic/storage-events";

export const store = { todos: [], isAuthenticated: false };

const allEvents = [];
let currentEventPositon = -1;

export function processEvent(event) {
  // console.log(new Date(), "processing event", event);
  if (event.position > currentEventPositon) {
    allEvents.push(event);
    currentEventPositon = event.position;
    store.todos = replay(allEvents).todos;
  }
  // console.log("new store.todos", store.todos);
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
