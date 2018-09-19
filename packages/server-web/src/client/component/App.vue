<template>
    <div id="app">
        <div id="nav">
          <button v-on:click="showHelp=true" class="help">?</button>
					<help v-if="showHelp" @close="showHelp = false" />

          <router-link tag="button" v-if="isAuthenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
        </div>
        <loading v-if="isLoading" />
        <router-view v-if="!isLoading"  @isAuthenticated="setAuthenticated" />
    </div>
</template>

<script>
import Loading from "./Loading.vue";
import Help from "./Help.vue";

export default {
  name: "App",
  components: {
    "loading": Loading,
    "help": Help
  },
  data() {
    return {
      isAuthenticated: false,
      isLoading: true,
      showHelp: false
    };
  },
  props: ["commands"],
  mounted() {
    this.$http
      .get("/login-status") // check server if logged in
      .then(() => {
        this.setAuthenticated(true);
      })
      .catch(() => {
        this.setAuthenticated(false);
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
      if (status) {
        this.commands.connect();
      }
    }
  }
};
</script>
<style>
@import "../main.css";
.help {
  color: black;
  background: #f5f5f5;
  border-radius: 50%;
  margin-right: 10px;
}
.help:hover {
  color: white;
}
</style>
