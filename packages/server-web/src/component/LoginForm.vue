<template>
  <div class="todasticapp">
    <asset-image :source="logo" />
    <span></span> <!-- quickfix for grid layout -->
    <div>
      <input type="text" name="username" v-model="input.username" placeholder="Username" />
      <input type="password" name="password" v-model="input.password" v-on:keydown.enter="login()" placeholder="Password" />
      <button type="button" v-on:click="login()">Login</button>
    </div>
  </div>
</template>

<script>
import AssetImage from "./AssetImage.vue";
import logo from "../asset/image/todastic-logo.svg";

export default {
  name: "LoginForm",
  components: { AssetImage },
  data() {
    console.log({ logo });
    return {
      logo,
      input: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      if (this.input.username !== "" && this.input.password !== "") {
        this.$http
          .post("/login", { username: this.input.username, password: this.input.password })
          .then(function(response) {
            this.$store.commit("isAuthenticated", true);
            this.$router.replace({ name: "home" });
          })
          .catch(function(err) {
            console.log(err);
            // TODO proper error handling
            console.log("user not authorized");
          });
      } else {
        console.log("A username and password must be present");
      }
    }
  }
};
</script>

<style scoped>
input {
  display: block;
  border: 0;
  box-shadow: 0 2px 1px -1px #000;
  padding: 10px;
  width: 30%;
  margin-right: 0.5%;
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
