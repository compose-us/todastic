<template>
  <div :class="$style.root">
    <div :class="$style.header">
      <todastic-logo :class="$style.logo" />
      <div :class="$style.nav">
        <button v-if="isAuthenticated" v-on:click="showHelp=true" :class="$style.help">?</button>
        <help v-if="showHelp" @close="showHelp = false" />
        <profile />
      </div>
    </div>
    <loading v-if="isLoading" />
    <router-view v-if="!isLoading" />
  </div>
</template>

<script>
import Loading from "./Loading.vue";
import Help from "./Help.vue";
import Profile from "./Profile.vue";
import { TodasticLogo } from "../../component";

export default {
  name: "App",
  components: {
    loading: Loading,
    help: Help,
    profile: Profile,
    "todastic-logo": TodasticLogo
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
        this.$store.commit("isAuthenticated", true);
      })
      .catch(() => {
        this.$store.commit("isAuthenticated", false);
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
<style lang="scss" module>
.root {
}

// elements

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
}

.nav {
  justify-self: flex-end;
}

.help {
  color: black;
  background: #ffffff;
  border-radius: 50%;
  margin-right: 10px;

  &:hover {
    color: white;
  }
}
</style>
