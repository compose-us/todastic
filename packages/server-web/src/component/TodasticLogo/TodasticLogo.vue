<template>
  <div :class="$style.root">
    <asset-image :source="this.logo" />
  </div>
</template>

<script>
import { AssetImage } from "../";
import logo from "../../asset/image/todastic-logo.svg";

export default {
  name: "TodasticLogo",
  components: { "asset-image": AssetImage },
  data() {
    return { logo };
  }
};
</script>

<style lang="scss" module>
.root {
  width: 200px;
}

// elements

// modifiers
</style>
