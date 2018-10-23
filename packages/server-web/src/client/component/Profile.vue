<template>
  <div :class="$style.profile" v-if="isAuthenticated">
    <button id="profile-button" v-on:click="menuCollapsed=!menuCollapsed"><todastic-icon :source="profileIcon" />&nbsp;{{username}}</button>
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
import PasswordChanger from "./PasswordChanger.vue";
import { TodasticIcon } from "../../component";
import * as icon from "../../asset/icon";

export default {
  name: "Profile",
  components: {
    "password-changer": PasswordChanger,
    "todastic-icon": TodasticIcon
  },
  data() {
    return {
      menuCollapsed: true,
      profileIcon: icon.Profile,
      showPasswordChanger: false
    };
  },
  methods: {
    logout() {
      this.$http
        .post("/logout", {})
        .catch(err => {
          console.log(err);
          // TODO proper error handling
        })
        .finally(() => {
          this.$store.commit("isAuthenticated", false);
          this.$store.commit("isLoading", false);
          this.$store.commit("username", "");
          this.$router.replace({ name: "login" });
        });
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    username() {
      return this.$store.getters.username;
    }
  }
};
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
  border: 1px solid #bbd5ed;
  background: #ffffff;
  color: #919098;
  right: 0px;
}
.menu li {
  list-style: none;
}
</style>
