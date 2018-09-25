import Vue from "vue";
import Vuex from "vuex";
import { replay } from "@todastic/storage-events";
import { mapGetters } from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isDragging: false,
    allEvents: [],
    currentEventPositon: -1,
    todos: [],
    commands: [],
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
    processEvent(state, event) {
      if (event.position > state.currentEventPositon) {
        state.allEvents.push(event);
        state.currentEventPositon = event.position;
        state.todos = replay(state.allEvents).todos;
      }
    },
    changePassword(state, val) {
      state.commands.changePassword(val);
    }
  }
});
