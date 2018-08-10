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
  name: 'Login',
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      if(this.input.username != "" && this.input.password != "") {
        if(this.input.username == "udo" && this.input.password == "p") {
          this.$emit("authenticated", true);
          this.$router.replace({ name: "home" });
        } else {
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
      }
    }
  }
};
</script>
