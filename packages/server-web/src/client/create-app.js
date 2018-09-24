import Vue from "vue";
import Router from "vue-router";
import LoginComponent from "./component/Login.vue";
import HomeComponent from "./component/Home.vue";
import AppComponent from "./component/App.vue";
import VueResource from "vue-resource";
import { store } from "./store.js";

Vue.use(Router);
Vue.use(VueResource);

function createRouter(commands) {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        redirect: {
          name: "home"
        }
      },
      {
        path: "/login",
        name: "login",
        component: LoginComponent
      },
      {
        path: "/home",
        name: "home",
        component: HomeComponent,
        props: { commands }
      }
    ]
  });
}

export default function createApp(commands) {
  const router = createRouter(commands);
  new Vue({
    el: "#app",
    store,
    render: h => h(AppComponent, { props: { commands } }),
    router
  });
}
