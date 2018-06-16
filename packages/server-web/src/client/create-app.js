import Vue from "vue";
import Home from "./components/Home.vue";

export default function createApp() {
  new Vue({
    el: "#app",
    render: h => h(Home)
  });
}
