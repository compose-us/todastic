<template>
    <div id="app">
        <div id="nav">
            <router-link v-if="isAuthenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
            <router-link v-if="isAuthenticated" to="/home">Go to Home</router-link>
        </div>
        <Loading v-if="isLoading" />
        <router-view v-if="!isLoading"  @isAuthenticated="setAuthenticated" />
    </div>
</template>

<script>
import Loading from "./Loading.vue";

export default {
  name: "App",
  components: {
    Loading
  },
  data() {
    return {
      isAuthenticated: false,
      isLoading: true
    };
  },
  mounted() {
    this.$http
      .get("/login-status") // check server if logged in
      .then(() => {
        this.isAuthenticated = true;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
        this.$router.replace({ name: "login" });
      });
  },
  methods: {
    logout() {
      this.$http
        .post("/logout", {})
        .then(function(response) {
          this.isAuthenticated = false;
          this.isLoading = false;
          this.$router.replace({ name: "login" });
        })
        .catch(function(err) {
          console.log(err);
          // TODO proper error handling
        });
    },
    setAuthenticated(status) {
      this.isAuthenticated = status;
      this.isLoading = false;
    }
  }
};
</script>
