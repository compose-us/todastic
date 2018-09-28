<template>
    <div id="app">
        <div id="nav">
          <button v-if="isAuthenticated" v-on:click="showHelp=true" class="help">?</button>
					<help v-if="showHelp" @close="showHelp = false" />

          <profile />
        </div>
        <loading v-if="isLoading" />
        <router-view v-if="!isLoading" />
    </div>
</template>

<script>
import Loading from "./Loading.vue";
import Help from "./Help.vue";
import Profile from "./Profile.vue";

export default {
  name: "App",
  components: {
    "loading": Loading,
    "help": Help,
    "profile": Profile
  },
  data() {
    return {
      showHelp: false
    };
  },
  mounted() {
    this.$http
      .get("/login-status") // check server if logged in
      .then(() => {
        this.$store.commit('isAuthenticated', true);
      })
      .catch(() => {
        this.$store.commit('isAuthenticated', false);
        this.$router.replace({ name: "login" });
      });
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>
<style>
@import "css/main.css";
.help {
  color: black;
  background: #ffffff;
  border-radius: 50%;
  margin-right: 10px;
}
.help:hover {
  color: white;
}
</style>
