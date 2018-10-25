<template>
	<transition name="modal">
    <div :class="$style.modalMask">
      <div :class="$style.modalWrapper" v-on:click="close">
        <div :class="$style.modalContainer">

          <div :class="$style.modalHeader">
            <slot name="header">
              <h1>Using Todastic</h1>
            </slot>
          </div>

          <div :class="$style.modalBody">
            <slot name="body">
              <div :class="$style.helpEntry">
                <h2>Labels</h2>
                <p>You can add and remove labels by editing the ToDo text.
                  Adding a label is as simple as adding <q>#label</q> somewhere in the text.
                  Labels within your text will be extracted in order to keep your ToDo text readable.
                  Labels at the end will be removed from the text and just live as labels.</p>
                  <h3>Example:</h3>
                  <p><q>Build a #zoo with lots of #animals in it #life-goals</q></p>
                  <p> will result in the ToDo text <q>Build a zoo with lots of animals in it</q> and the labels
                  <q>#zoo, #animals, #life-goals</q>.</p>
              </div>
              <div :class="$style.helpEntry">
                <h2>Tracking time</h2>
                <span>You can add and remove time tracking entries by editing the ToDo text.
                  <p>Time tracking entries follow the pattern
                  <q>#TRACK({"trackedTime": "01:00:00", "tracker": "Mary", "date": "2018-09-13 17:27:00"})</q></p>
                  <p>You can add as many of them as you like to your ToDo.</p>
                  <p>Removing or editing an entry is done via editing the ToDo text.</p>
                  <p>You can analyze the time entries via scripting.</p>
                </span>
              </div>
              <div :class="$style.helpEntry">
                <h2>Scripting</h2>
                <p>The ability to run arbitrary scripts is one of Todastics most powerful features. Scripts are plain
                  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript">JavaScript</a>.
                  You can drag a part of your ToDo tree here to let it run on that part only or press the "Run" button to run it
                  on all of your ToDos.</p>
                  <p>The following variables are defined:</p>
                <ul>
                  <li><q>list</q></li> incorporating the either the complete ToDo tree or the tree you have dragged onto the editor.
                  <li><q>dashboard</q></li> providing the two functions
                  <ul>
                    <li><q>groupByStatus(list)</q></li>
                    <li><q>trackedTime(list)</q></li>
                  </ul>
                </ul>
                <br />
                <p>
                <h3>Example:</h3>
                <p><q>console.log(dashboard.groupByStatus(list))</q> will show the ToDos grouped by status in your
                Browser console. (We don't have a good way to display the results yet, sorry!)</p>
              </div>
            </slot>
          </div>

          <div :class="$style.modalFooter">
            <slot name="footer">
              <a href="mailto:feedback@todastic.app">Feedback / Contact</a>
              <button :class="$style.modalDefaultButton" @click="close">
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
  name: "Help",
  methods: {
    close() {
      this.$emit("close");
    },
    escapeKeyListener(event) {
      if (event.keyCode === 27) {
        this.close();
      }
    }
  },
  created() {
    document.addEventListener("keyup", this.escapeKeyListener);
  },
  destroyed() {
    document.removeEventListener("keyup", this.escapeKeyListener);
  }
};
</script>

<style lang="scss" module>
// elements

.modalMask {
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modalWrapper {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}

.modalContainer {
  max-width: 90%;
  margin: 25px;
  padding: 25px;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modalBody {
  margin: 20px 0;
}

.modalDefaultButton {
  float: right;
}

.helpEntry {
  padding-bottom: 20px;
  font-size: medium;
}
.helpEntry p {
  margin-bottom: 0;
}
.helpEntry q {
  background-color: rgba(0, 0, 0, 0.05);
  quotes: none;
  font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono,
    Courier New;
}
.helpEntry h2 {
  padding-bottom: 5px;
}
.helpEntry ul {
  padding-left: 20px;
}
.helpEntry ul ul {
  padding-left: 50px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
// modifiers

.modalEnter {
  opacity: 0;
}

.modalLeaveActive {
  opacity: 0;
}

.modalEnter .modalContainer,
.modalLeaveActive .modalContainer {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
