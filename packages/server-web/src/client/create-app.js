import Vue from "vue";
import Home from "./components/Home.vue";

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
