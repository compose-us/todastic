import Vue from "vue";
import Home from "./components/Home.vue";
import VueResource from "vue-resource";
Vue.use(VueResource);

export default function createApp(commands) {
  new Vue({
    el: "#app",
    render: h =>
      h(Home, {
        props: {
          commands
        }
      })
  });
}
