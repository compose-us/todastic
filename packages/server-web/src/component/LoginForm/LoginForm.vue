<template>
  <div :class="$style.root">
    <div :class="$style.wrapper">
      <todastic-logo :class="$style.logo" />
      <form v-on:submit.prevent="login()">
        <div :class="$style.formWrapper">
          <input type="text" name="username" v-model="input.username" placeholder="Username" autocomplete="username" />
          <button :class="$style.loginButton" type="submit">Login</button>
          <input type="password" name="password" v-model="input.password" placeholder="Password" autocomplete="current-password" />
          <div :class="$style.errorInfo" v-if="this.errorMessage">{{this.errorMessage}}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { TodasticLogo } from "../";

export default {
  name: "LoginForm",
  props: ["verifyLogin"],
  components: { TodasticLogo },
  data() {
    return {
      errorMessage: null,
      input: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      try {
        await this.verifyLogin(this.input.username, this.input.password);
        this.errorMessage = null;
      } catch (err) {
        this.errorMessage = err.message;
      }
    }
  }
};
</script>

<style lang="scss" module>
$max-box-size: 450px;
$min-box-size: 320px;

.root {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

// elements

.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: $min-box-size;
  min-width: $min-box-size;
  width: 95%;
  max-height: $max-box-size;
  max-width: $max-box-size;
  padding: 25px;
  box-shadow: 0 0 1em $color-font;
}

.logo {
  align-self: center;
  margin-bottom: 25px;
}

.formWrapper {
  display: grid;
  grid-template-columns: 1fr max-content;
}

.loginButton {
  grid-row: span 2;
}

.errorInfo {
  position: absolute;
  color: $color-notification;
  border-left: 5px solid $color-notification;
  background-color: rgba($color-notification, 0.1);
  text-align: left;
  padding: 5px 5px;
  bottom: 25px;
  left: 25px;
  right: 25px;
}

input {
  display: block;
  border: 0;
  box-shadow: 0 2px 1px -1px #000;
  padding: 10px;
  width: 100%;
  margin-right: 0.5%;
  background-color: rgba(0, 0, 0, 0.05);
}

// modifiers
</style>
