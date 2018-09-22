import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isDragging: false
  },
  getters: {
    isDragging(state) {
      return state.isDragging;
    }
  },
  mutations: {
    isDragging(state, val) {
      if (val === true || val === false) {
        state.isDragging = val;
      }
    }
  }
});
