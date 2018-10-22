<template>
  <div :class="$style.todasticapp">
    <span></span> <!-- quickfix for grid layout -->
    <span></span> <!-- second quickfix for grid layout -->
    <div>
      <input :class="$style.loginInputField" type="text" name="username" v-model="input.username" placeholder="Username" />
      <input :class="$style.loginInputField" type="password" name="password" v-model="input.password" v-on:keydown.enter="login()" placeholder="Password" />
      <button type="button" v-on:click="login()">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
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
            this.$store.commit("username", this.input.username);
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

<style lang="scss" module>
.todasticapp {
  display: grid;
  grid-template-columns: auto 30%;
}

.loginInputField {
  display: block;
  border: 0;
  box-shadow: 0 2px 1px -1px #000;
  padding: 10px;
  width: 30%;
  margin-right: 0.5%;
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
