<template>
  <div class="user">
    <button v-on:click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout: logout
  }
};
// TODO for a better approach see https://blog.sqreen.io/authentication-best-practices-vue/
function logout() {
  this.$http.post('/logout', {}).then( function(response) {
    window.location.href = "/";
  }).catch(function(err) {
    console.log(err);
    // TODO proper error handling
  });
}
</script>
