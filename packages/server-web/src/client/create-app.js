import Vue from "vue";
import VueResource from "vue-resource";
import AppComponent from "./component/App.vue";
import { initRouter } from "./create-router.js";
import { initStore } from "./create-store";
import "../style/scaffolding.scss";

export default function createApp(commands) {
  Vue.use(VueResource);
  const store = initStore({ Vue, commands });
  const router = initRouter({ Vue });
  new Vue({
    el: "#app",
    store,
    render: h => h(AppComponent),
    router
  });
}
