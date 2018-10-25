<template>
  <login-form :login="this.login" />
</template>

<script>
import { LoginForm } from "../../component";

export default {
  name: "Login",
  components: { "login-form": LoginForm },
  methods: {
    async login(username, password) {
      try {
        const response = await this.$http.post("/login", { username, password });
        this.$store.commit("isAuthenticated", true);
        this.$store.commit("username", username);
        this.$router.replace({ name: "home" });
      } catch (err) {
        console.error(err);
        if (err.status === 401) {
          throw new Error("Wrong username or password.");
        } else {
          throw new Error("Could not login!");
        }
      }
    }
  }
};
</script>
