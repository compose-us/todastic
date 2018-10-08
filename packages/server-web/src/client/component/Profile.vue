<template>
  <div :class="$style.profile" v-if="isAuthenticated">
    <button id="profile-button" v-on:click="menuCollapsed=!menuCollapsed"><i class="fas fa-user"></i></button>
    <div style="clear: both;"></div>
    <div :class="$style.menu" v-if="!menuCollapsed">
      <ul>
        <li><button v-on:click="showPasswordChanger=true">Change password</button></li>
        <li><router-link tag="button" v-if="isAuthenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link></li>
      </ul>
      <div style="clear: both;"></div>
    </div>
    <password-changer v-if="showPasswordChanger" @close="showPasswordChanger = false" />
  </div>
</template>

<script>
import PasswordChanger from './PasswordChanger.vue';
export default {
  name: "Profile",
  components: {
    "password-changer": PasswordChanger
  },
  data() {
    return {
      menuCollapsed: true,
      showPasswordChanger: false
    }
  },
  methods: {
    logout() {
      this.$http
        .post("/logout", {})
        .catch( err => {
          console.log(err);
          // TODO proper error handling
        }).finally( () => {
          this.$store.commit('isAuthenticated', false);
          this.$store.commit('isLoading', false);
          this.$router.replace({ name: "login" });
        });
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
}
</script>

<style lang="scss" module>
.profile {
  float: right;
}
.menu {
  z-index: 2;
  position: absolute;
  right: 10px;
  margin-top: 20px;
}
.menu button {
  float: right;
  border: 1px solid #BBD5ED;
  background: #ffffff;
  color: #919098;
  right: 0px;
}
.menu li {
  list-style: none;
}
</style>
