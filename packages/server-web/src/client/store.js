import Vue from "vue";
import Vuex from "vuex";
import { replay } from "@todastic/storage-events";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isDragging: false,
    allEvents: [],
    currentEventPositon: -1,
    todos: []
  },
  getters: {
    isDragging(state) {
      return state.isDragging;
    },
    todos(state) {
      return state.todos;
    }
  },
  mutations: {
    isDragging(state, val) {
      if (val === true || val === false) {
        state.isDragging = val;
      }
    },
    processEvent(state, event) {
      if (event.position > state.currentEventPositon) {
        state.allEvents.push(event);
        state.currentEventPositon = event.position;
        state.todos = replay(state.allEvents).todos;
      }
    }
  }
});
