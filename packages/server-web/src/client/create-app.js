import Vue from "vue";
import Router from "vue-router";
import LoginComponent from "./components/Login.vue";
import HomeComponent from "./components/Home.vue";
import AppComponent from "./components/App.vue";
import VueResource from "vue-resource";

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
    render: h => h(AppComponent),
    router
  });
}
