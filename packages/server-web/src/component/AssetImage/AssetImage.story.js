import Vue from "vue";

import { storiesOf } from "@storybook/vue";
import AssetImage from "./AssetImage.vue";
import logo from "../../asset/image/todastic-logo.svg";

Vue.component("AssetImage", AssetImage);

storiesOf("AssetImage", module)
  .add("logo", () => ({
    components: { AssetImage },
    render() {
      return <AssetImage source={logo} />;
    }
  }));
