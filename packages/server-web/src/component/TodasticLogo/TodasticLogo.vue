<template>
  <div :class="$style.root">
    <asset-image :source="this.logo" />
  </div>
</template>

<script>
import AssetImage from "../AssetImage";
import logo from "../../asset/image/todastic-logo.svg";
export default {
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
</style>
