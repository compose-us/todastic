<template>
	<transition name="modal">
    <div :class="$style.modalMask">
      <div :class="$style.modalWrapper">
        <div :class="$style.modalContainer">

          <div :class="$style.modalHeader">
            <slot name="header">
              <h1>Change password</h1>
            </slot>
          </div>

          <div :class="$style.modalBody">
            <slot name="body">
              <div :class="$style.entry">
                <div :class="$style.form">
                  New password: <input v-model="pass1" type="password" />
                </div><div :class="$style.form">
                  Retype new password: <input v-model="pass2" type="password" />
                  <span :class="$style.indicator" v-if="!empty && !same" style="color: red">≠</span>
                  <span :class="$style.indicator" v-if="!empty && same" style="color: green">✓</span>
                </div><div :class="$style.form">
                  <button id="change-password" @click.prevent="changePassword" :disabled="empty || !same">Submit</button>
                </div>
              </div>
            </slot>
          </div>

          <div :class="$style.modalFooter">
            <slot name="footer">
              <a href="mailto:feedback@todastic.app">Feedback / Contact</a>
              <button :class="$style.modalDefaultButton" @click="$emit('close')">
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

<style lang="scss" module>
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
.modalMask {
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

.modalWrapper {
  display: table-cell;
  vertical-align: middle;
}

.modalContainer {
  width: 90%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modalBody {
  margin: 20px 0;
}

.modalDefaultButton {
  float: right;
}

.modalEnter {
  opacity: 0;
}

.modalLeaveActive {
  opacity: 0;
}

.modalEnter .modalcontainer,
.modalLeaveActive .modalContainer {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
