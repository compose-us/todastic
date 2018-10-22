import Vuex from "vuex";
import { replay } from "@todastic/storage-events";
import createSocketConnection from "./socket-connection.js";

export function initStore({ Vue }) {
  Vue.use(Vuex);

  const initialState = {
    allEvents: [],
    currentEventPosition: -1,
    todos: [],
    commands: {},
    isAuthenticated: false,
    isDragging: false,
    isEditing: {},
    isLoading: false
  };

  const getters = {
    commands(state) {
      return state.commands;
    },
    isLoading(state) {
      return state.isLoading;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    isDragging(state) {
      return state.isDragging;
    },
    isEditing(state) {
      return state.isEditing;
    },
    todos(state) {
      return state.todos;
    }
  };

  const syncActions = {
    setCommands(state, commands) {
      state.commands = commands;
    },
    isLoading(state, val) {
      state.isLoading = !!val;
    },
    isAuthenticated(state, val) {
      if (val === true || val === false) {
        state.isAuthenticated = val;
        if (val) {
          state.commands.connect();
        }
      }
    },
    isDragging(state, val) {
      state.isDragging = !!val;
    },
    isEditing(state, todosStatus) {
      state.isEditing = { ...state.isEditing, ...todosStatus };
    },
    currentEventPosition(state, position) {
      state.currentEventPosition = position;
    },
    todos(state, newTodos) {
      state.todos = newTodos;
    },
    changePassword(state, val) {
      state.commands.changePassword(val);
    },
    addEventToAllEvents(state, event) {
      state.allEvents = [...state.allEvents, event];
    }
  };

  const asyncActions = {
    processEvent(context, event) {
      new Promise((resolve, reject) => {
        try {
          if (event.position > context.state.currentEventPosition) {
            context.commit("addEventToAllEvents", event);
            context.commit("currentEventPosition", event.position);
            const todos = replay(context.state.allEvents).todos;
            context.commit("todos", todos);
          }
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }
  };

  const store = new Vuex.Store({
    state: initialState,
    getters,
    mutations: syncActions,
    actions: asyncActions
  });

  const processEvent = event => store.dispatch("processEvent", event);
  const commands = createSocketConnection(processEvent);
  store.commit("setCommands", commands);

  return store;
}
