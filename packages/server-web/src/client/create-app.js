import Vue from "vue";
import VueResource from "vue-resource";
import AppComponent from "./component/App.vue";
import { initRouter } from "./create-router.js";
import { store } from "./store.js";
import "../style/scaffolding.scss";

export default function createApp(commands) {
  Vue.use(Router);
  Vue.use(VueResource);
  store.commit("commands", commands);
  const router = initRouter({ commands });
  new Vue({
    el: "#app",
    store,
    render: h => h(AppComponent),
    router
  });
}
