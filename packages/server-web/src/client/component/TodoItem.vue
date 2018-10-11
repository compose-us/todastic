<template>
  <div :class="{[$style.todoItem]: true, [$style.updating]: updating}" :ref="`todo-item-${todo.todoId}`">
    <div :class="{[$style.todo]: true, [$style.todoDone]: todo.status === 'done', [$style.expanded]: expanded }">
      <div :class="{[$style.dropzoneSub]: true, [$style.dropzoneActive]: isDragging, [$style.dropzoneInactive]: !isDragging}" v-if="!updating" ref="dropzoneSub"></div>
			<todo-options
        :adderVisible="adderVisible"
        :expanded="expanded"
        :removeTodo="removeTodo"
        :toggleTodoOptions="toggleTodoOptions"
        :toggleAddTodoItem="toggleAddTodoItem"
      />
      <div :class="{[$style.status]: true, [$style.statusOpen]: todo.status === 'open', [$style.statusDone]: todo.status === 'done'}" v-on:click="toggleStatus(todo)"></div>
      <div :class="$style.id">#{{todo.todoId.substring(0, 4)}}</div>
      <div v-if="!updating">
        <span v-on:click="updating=true" :class="{[$style.title]: true, [$style.titleOpen]: todo.status === 'open', [$style.titleDone]: todo.status === 'done' }">{{todo.title}}</span>
        <span v-if="hasTrackedTime">
          <todastic-icon :source="icons.Clock" />
          {{trackedTimeOnTodo}}
        </span>
        <todo-label v-for="label in todo.labels" :todoLabel="`${label}`" :key="label" />
      </div>
      <todo-text v-if="updating" ref="updater" :visible="updating" v-on:change="updateTitle" v-bind.sync="{ initialTodoTitle: completeText }" :key="`updateTodo-${todo.todoId}`" />
    </div>
    <todo-text ref="adder" v-on:change="addTodo" :visible="adderVisible" :key="`addTodo-${todo.todoId}`" :parentId="todo.todoId" />
  </div>
</template>

<script>
import TodasticIcon from "../../component/TodasticIcon";
import TodoText from "./TodoText.vue";
import TodoOptions from "./TodoOptions.vue";
import TodoLabel from "./TodoLabel.vue";

import * as icons from "../../asset/icon";

export default {
  name: "TodoItem",
  props: ["commands", "todo"],
  components: {
    "todastic-icon": TodasticIcon,
    "todo-text": TodoText,
    "todo-options": TodoOptions,
    "todo-label": TodoLabel
  },
  mounted() {
    const { dropzoneSub } = this.$refs;
    if (dropzoneSub) {
      dropzoneSub.addEventListener("dragenter", this.handleDropzoneEnter, false);
      dropzoneSub.addEventListener("dragover", this.handleDropzoneOver, false);
      dropzoneSub.addEventListener("dragleave", this.handleDropzoneLeave, false);
      dropzoneSub.addEventListener("drop", this.handleDrop, false);
    }
  },
  beforeDestroy() {
    const { dropzoneSub } = this.$refs;
    if (dropzoneSub) {
      dropzoneSub.removeEventListener("dragenter", this.handleDropzoneEnter);
      dropzoneSub.removeEventListener("dragover", this.handleDropzoneOver);
      dropzoneSub.removeEventListener("dragleave", this.handleDropzoneLeave);
      dropzoneSub.removeEventListener("drop", this.handleDrop);
    }
  },
  computed: {
    completeText() {
      return (this.todoTitle + " " + this.todoLabels.join(" ") + " " + this.todoTrackedTimes.join(" ")).trim();
    },
    hasTrackedTime() {
      return this.$props.todo.trackedTimes.length > 0;
    },
    todoTrackedTimes() {
      return this.$props.todo.trackedTimes.map(tracked => "#TRACK(" + JSON.stringify(tracked) + ")");
    },
    trackedTimeOnTodo() {
      const timeToSeconds = time => {
        const [hours, minutes, seconds] = time.split(":").map(num => parseInt(num));
        return hours * 60 * 60 + minutes * 60 + seconds;
      };
      const secondsToTime = seconds => {
        const h = Math.floor(seconds / 60 / 60);
        const m = Math.floor((seconds % (60 * 60)) / 60);
        const s = seconds % 60;
        const nf = n => `${n < 10 ? "0" : ""}${n}`;
        return [h, m, s].map(nf).join(":");
      };
      return secondsToTime(
        this.$props.todo.trackedTimes.reduce((seconds, t) => seconds + timeToSeconds(t.trackedTime), 0)
      );
    },
    todoTitle() {
      return this.$props.todo.title;
    },
    todoLabels() {
      return this.$props.todo.labels || [];
    },
    titleWithLabels: function() {
      const { todo } = this.$props;
      return `${todo.title} ${todo.labels.join(" ")}`;
    },
    isDragging() {
      return this.$store.getters.isDragging;
    }
  },
  data() {
    return {
      adderVisible: false,
      expanded: false,
      icons,
      updating: false
    };
  },
  methods: {
    handleDropzoneEnter(event) {},
    handleDropzoneOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      event.target.classList.remove(this.$style.activeBottom);
      event.target.classList.add(this.$style.activeBottom);
      return false;
    },
    handleDropzoneLeave(event) {
      event.target.classList.remove(this.$style.activeBottom);
    },
    handleDrop(event) {
      const { commands, todo } = this.$props;
      event.target.classList.remove(this.$style.activeBottom);
      const myTodo = JSON.parse(event.dataTransfer.getData("json/todo"));
      commands.moveTodo(myTodo, { parentId: todo.todoId, position: todo.position + 1 });
    },
    updateTitle(newTitle) {
      const { commands, todo } = this.$props;
      commands.changeTodo(todo, { title: newTitle });
      this.updating = false;
    },
    addTodo(newTitle) {
      const { commands, todo } = this.$props;
      commands.addTodo({ title: newTitle, parentId: todo.todoId });
    },
    toggleStatus(todo) {
      const { commands } = this.$props;
      const newStatus = todo.status == "open" ? "done" : "open";
      commands.changeTodo(todo, { status: newStatus });
    },
    toggleTodoOptions() {
      if (this.expanded && this.adderVisible) {
        this.toggleAddTodoItem();
      }
      this.expanded = !this.expanded;
    },
    toggleAddTodoItem() {
      this.adderVisible = !this.adderVisible;
      if (this.adderVisible) {
        // Set focus on the input field if adder is toggled to visible
        this.$nextTick(() => this.$refs.adder.$refs.input.focus());
      }
    },
    removeTodo() {
      const { commands, todo } = this.$props;
      return commands.removeTodo(todo);
    }
  }
};
</script>

<style lang="scss" module>
.todoItem {
  margin: 1em 0;
  &.updating {
    .todo {
      grid-template-columns: 25px 25px max-content 1fr;
      justify-items: stretch;
    }
  }
}

.todo {
  position: relative;
  display: grid;
  grid-template-columns: 25px 25px max-content max-content 1fr;
  justify-items: center;
  align-items: center;
}
.todo.expanded {
  margin-left: -25px;
  grid-template-columns: 50px 25px max-content max-content 1fr;
  justify-items: left;
}
.todoDone {
  font-size: 0.9em;
}
.todo > * {
  padding: 5px;
}
.titleDone {
  color: grey;
  text-decoration: line-through;
}
.todo::after {
  clear: both;
}

.id {
  color: var(--notice-small-color);
}

.status {
  display: inline-flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  line-height: 15px;
  border: 2px solid #000;
  border-radius: 3px;
  margin: 5px;
}
.status.statusDone::after {
  content: "x";
}
.status.statusDone {
  border: 2px solid grey;
  color: grey;
}
.dropzones {
  display: grid;
  grid-template-columns: 50px 1fr;
}
.dropzoneSub {
  position: absolute;
  top: 0px;
  bottom: -10px;
  left: 25px;
  right: 0;
}
.dropzoneSub.activeBottom {
  border-bottom: 5px solid lightgreen;
}
.dropzoneActive {
  z-index: 200;
}
.dropzoneInactive {
  z-index: -1;
}
</style>
