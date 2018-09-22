import { replay } from "@todastic/storage-events";

export const todoStore = { todos: [] };

const allEvents = [];
let currentEventPositon = -1;
let globalDraggingState = false;

export function processEvent(event) {
  // console.log(new Date(), "processing event", event);
  if (event.position > currentEventPositon) {
    allEvents.push(event);
    currentEventPositon = event.position;
    todoStore.todos = replay(allEvents).todos;
  }
  // console.log("new store.todos", store.todos);
}
