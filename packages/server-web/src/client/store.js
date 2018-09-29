import Vue from "vue";
import Vuex from "vuex";
import { replay } from "@todastic/storage-events";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isDragging: false,
    allEvents: [],
    currentEventPosition: -1,
    todos: [],
    commands: {},
    isAuthenticated: false,
    isLoading: false
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    isDragging(state) {
      return state.isDragging;
    },
    todos(state) {
      return state.todos;
    }
  },
  mutations: {
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
    commands(state, commands) {
      state.commands = commands;
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
      state.allEvents = state.allEvents = [...state.allEvents, event];
    }
  },
  actions: {
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
  }
});
