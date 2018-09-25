<template>
	<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h1>Change password</h1>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="entry">
                <div class="form">
                  New password: <input v-model="pass1" type="password"></input>
                </div><div class="form">
                  Retype new password: <input v-model="pass2" type="password"></input>
                  <span class="indicator" v-if="!empty && !same" style="color: red">≠</span>
                  <span class="indicator" v-if="!empty && same" style="color: green">✓</span>
                </div><div class="form">
                  <button id="change-password" @click.prevent="changePassword" :disabled="empty || !same">Submit</button>
                </div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <a href="mailto:feedback@todastic.app">Feedback / Contact</a>
              <button class="modal-default-button" @click="$emit('close')">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "PasswordChanger",
  data() {
    return {
      pass1: "",
      pass2: ""
    }
  },
  methods: {
    changePassword() {
      this.$store.commit("changePassword", this.$data.pass1);
      this.$emit('close');
    }
  },
  computed: {
    empty() {
      return this.$data.pass1.length == 0;
    },
    same() {
      return this.$data.pass1 == this.$data.pass2;
    }
  }
}
</script>

<style>
#change-password:disabled {
  background: #C8C8C8;
}
.form {
  margin: 10px;
}
.indicator {
  margin-left: 10px;
  font-size: x-large;
}
.entry {
  padding-bottom: 20px;
  font-size: medium;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 90%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
