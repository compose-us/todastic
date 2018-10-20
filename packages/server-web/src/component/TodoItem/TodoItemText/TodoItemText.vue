<template>
  <div :class="[$style.root, isExpanded && $style.isExpanded]">
    <div :class="$style.title">{{title}}</div>
    <vue-markdown :class="$style.description" v-if="isExpanded">{{description}}</vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  components: { VueMarkdown },
  props: { text: { required: true }, isExpanded: { type: Boolean } },
  data() {
    const { text } = this.$props;
    const [title, ...rest] = text.split("\n");
    const description = rest
      .reduce((acc, elem) => (acc.length === 0 && elem === "" ? acc : [...acc, elem]), [])
      .join("\n");
    return {
      title,
      description
    };
  }
};
</script>

<style lang="scss" module>
.root {
  display: inline-flex;
  align-items: center;
}

// elements

// modifiers

.isExpanded {
  &.root {
    flex-direction: column;
  }
}
</style>
