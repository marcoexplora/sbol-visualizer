<template>
  <header class="blue-container">

      <div style="float:left">
        <h2 class="text-muted-white">Part id: {{header.partID}}</h2>
        <h1>{{header.name}}</h1>
        <h2 class="text-muted-white" style="padding-bottom: 24px">Version no.: {{ header.version }}</h2>
        <h2 class="text-muted-white" >Created by: {{header.creator}}</h2>
      </div>
      <div style="float:right;margin-top:-0.4em;">
        <a  v-if="this.header.source_link" class="va-super py1" :href="this.header.source_link" target="_blank">
          <sbol-icon-arrow-in-down/>
        </a>

        <a class="va-super py1">
          <sbol-icon-info/>
        </a>
        <a class="va-super py1"  :href="this.header.persistentIdentity" target="_blank">
          <sbol-icon-arrow-up-right/>
        </a>
      </div>


  </header>
</template>
<script>
import SbolLink from "../components/SbolLinkText";

import SbolIconInfo from "../components/SbolIconInfo";
import SbolIconArrowInDown from "../components/SbolIconArrowInDown";
import SbolIconArrowUpRight from "../components/SbolIconArrowUpRight";


export default {
  props: ["header"],
  data() {
    return {};
  },
  methods: {},
  components: {
    SbolIconArrowUpRight,
    SbolIconArrowInDown,
    SbolLink,
    SbolIconInfo
  },
};
</script>

<style scoped>
@import "scss/global.scss";


header {
  overflow: hidden;
  height: calc(14vh);
  margin: 0 0 5px 0;
  padding:10px;
  border: 1px solid #fff;
}

header h2,h1{
  margin: 0px
}
h1,.h1 {
  font-size: 24px
}

header *,
a,
a:hover {
  color: #fff;
  text-decoration: none;
}

ul {
  padding: 5px;
  margin: 0px;
}

ul li {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid #f0f2f5;
}
ul li:nth-last-child(1) {
  border-bottom: none !important;
}
ul li span {
  text-align: right;
  font-weight: 400;
}


</style>
