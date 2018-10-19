<template>
  <div :class="{[$style.todoItem]: true, [$style.updating]: isEditing, [$style.expanded]: expanded, [$style.open]: todo.status === 'open', [$style.done]: todo.status === 'done'}" :ref="`todo-item-${todo.todoId}`">
    <div :class="$style.todo">
      <div :class="{[$style.dropzoneSub]: true, [$style.dropzoneActive]: isDragging, [$style.dropzoneInactive]: !isDragging}" v-if="!isEditing" ref="dropzoneSub"></div>
			<todo-options
        :adderVisible="adderVisible"
        :expanded="expanded"
        :removeTodo="removeTodo"
        :toggleTodoOptions="toggleTodoOptions"
        :toggleAddTodoItem="toggleAddTodoItem"
      />
      <div :class="$style.status" v-on:click="toggleStatus(todo)"></div>
      <div :class="$style.id">#{{todo.todoId.substring(0, 4)}}</div>
      <div v-if="!isEditing">
        <span v-on:click="setEditing()" :class="$style.title">{{todo.title}}</span>
        <span v-if="hasTrackedTime">
          <todastic-icon :source="icons.Clock" />
          {{trackedTimeOnTodo}}
        </span>
        <todo-label v-for="label in todo.labels" :todoLabel="`${label}`" :key="label" />
      </div>
      <todo-text v-if="isEditing" v-on:cancel="cancel" v-on:change="updateTitle" v-bind.sync="{ initialTodoTitle: completeText }" :key="`updateTodo-${todo.todoId}`" />
    </div>
    <todo-text v-if="adderVisible" ref="adder" v-on:change="addTodo" v-on:cancel="cancel" :key="`addTodo-${todo.todoId}`" :parentId="todo.todoId" />
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
  props: ["todo"],
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
      return (this.todoTitle + " " + this.todoLabels.join(" ") + " " + this.todoTrackedTimesString.join(" ")).trim();
    },
    hasTrackedTime() {
      return this.todoTrackedTimes.length > 0;
    },
    todoTrackedTimes() {
      return this.$props.todo.trackedTimes || [];
    },
    todoTrackedTimesString() {
      return this.todoTrackedTimes.map(tracked => "#TRACK(" + JSON.stringify(tracked) + ")");
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
      return secondsToTime(this.todoTrackedTimes.reduce((seconds, t) => seconds + timeToSeconds(t.trackedTime), 0));
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
    },
    isEditing() {
      const { todo } = this.$props;
      return this.$store.getters.isEditing[todo.todoId];
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
    cancel() {
      this.updating = false;
    },
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
      const { todo } = this.$props;
      const { commands } = this.$store.getters;
      event.target.classList.remove(this.$style.activeBottom);
      const myTodo = JSON.parse(event.dataTransfer.getData("json/todo"));
      commands.moveTodo(myTodo, { parentId: todo.todoId, position: todo.position + 1 });
    },
    updateTitle(newTitle) {
      const { todo } = this.$props;
      const { commands } = this.$store.getters;
      commands.changeTodo(todo, { title: newTitle });
      this.$store.commit("isEditing", { [todo.todoId]: false });
    },
    addTodo(newTitle) {
      const { todo } = this.$props;
      const { commands } = this.$store.getters;
      commands.addTodo({ title: newTitle, parentId: todo.todoId });
    },
    setEditing() {
      const { todo } = this.$props;
      this.$store.commit("isEditing", { [todo.todoId]: true });
    },
    toggleStatus(todo) {
      const { commands } = this.$store.getters;
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
      const { todo } = this.$props;
      const { commands } = this.$store.getters;
      return commands.removeTodo(todo);
    }
  }
};
</script>

<style lang="scss" module>
.todoItem {
  margin: 1em 0;
}

.todo {
  position: relative;
  display: grid;
  grid-template-columns: 25px 25px 50px repeat(auto-fit, minmax(50%, 1fr));
  justify-items: center;
  align-items: center;

  & > * {
    padding: 5px;
    justify-self: flex-start;
  }
}

.title {
  justify-content: flex-start;
}

.id {
  color: $color-notice-small;
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

.updating {
  .todo {
    grid-template-columns: 25px 25px max-content 1fr;
    justify-items: stretch;
  }
}

.done {
  .todo {
    font-size: 0.9em;
  }

  .status {
    border: 2px solid grey;
    color: grey;
  }

  .status::after {
    content: "x";
  }

  .title {
    color: grey;
    text-decoration: line-through;
  }
}

.expanded {
  .todo {
    margin-left: -25px;
    grid-template-columns: 50px 25px max-content max-content 1fr;
    justify-items: left;
  }
}
</style>
