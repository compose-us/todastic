<template>
  <div :class="$style.root">
    <loading v-if="isLoading" />
    <router-view v-if="!isLoading" />
  </div>
</template>

<script>
import Loading from "./Loading.vue";

export default {
  name: "App",
  components: {
    loading: Loading
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
    }
  }
};
</script>
<style lang="scss" module>
.root {
  min-height: 100%;
}

// elements
</style>
