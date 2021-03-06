import Router from "vue-router";
import LoginComponent from "./component/Login.vue";
import HomeComponent from "./component/Home.vue";

export function initRouter({ Vue }) {
  Vue.use(Router);

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
        component: HomeComponent
      }
    ]
  });
}
