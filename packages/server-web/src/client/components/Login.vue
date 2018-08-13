<template>
  <div class="todasticapp">
    <h1>Todastic</h1>
    <input type="text" name="username" v-model="input.username" placeholder="Username" />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>
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
            this.$emit("authenticated", true);
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
