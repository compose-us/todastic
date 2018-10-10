<template>
  <div :class="$style.loginForm">
    <asset-image :source="logo" />
    <form v-on:submit.prevent="login()">
      <input type="text" name="username" v-model="input.username" placeholder="Username" />
      <input type="password" name="password" v-model="input.password" placeholder="Password" />
      <div v-if="this.errorMessage" :class="$style.errorInfo">{{this.errorMessage}}</div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { AssetImage } from "../";
import logo from "../../asset/image/todastic-logo.svg";

export default {
  name: "LoginForm",
  props: ["verifyLogin"],
  components: { AssetImage },
  data() {
    return {
      errorMessage: null,
      logo,
      input: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      try {
        await this.verifyLogin(this.username, this.password);
        this.errorMessage = null;
      } catch (err) {
        this.errorMessage = err.message;
      }
    }
  }
};
</script>

<style lang="scss" module>
.loginForm {
  display: flex;
  flex-direction: column;
}

.errorInfo {
  color: $error-text;
  padding: 2em 0;
}

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
