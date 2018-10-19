import Vue from "vue";
import VueResource from "vue-resource";
import AppComponent from "./component/App.vue";
import { initRouter } from "./create-router.js";
import { initStore } from "./create-store.js";
import "../style/scaffolding.scss";

export default function createApp() {
  Vue.use(VueResource);

  const store = initStore({ Vue });
  const router = initRouter({ Vue });

  console.log({ store });
  return new Vue({
    el: "#app",
    store,
    render: h => h(AppComponent),
    router
  });
}
