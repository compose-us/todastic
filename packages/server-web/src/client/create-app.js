import Vue from "vue";
import Router from "vue-router";
import LoginComponent from "./components/Login.vue";
import HomeComponent from "./components/Home.vue";
import AppComponent from "./components/App.vue";
import VueResource from "vue-resource";

Vue.use(Router);
Vue.use(VueResource);

export default function createApp(commands) {
  const router = new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        redirect: {
          name: "login"
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

  new Vue({
    el: "#app",
    render: h => h(AppComponent),
    router
  });
}
