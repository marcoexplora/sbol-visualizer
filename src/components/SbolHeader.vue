<template>
  <header class="blue-container">

      <div style="float:left">
        <h2 class="text-muted-white">Part id: {{header.partID}}</h2>
        <h1>{{header.name}}</h1>
        <h2 class="text-muted-white" style="padding-bottom: 24px">Version no.: {{ header.version }}</h2>
        <h2 class="text-muted-white" >Created by: {{header.creator}}</h2>
      </div>
      <div style="float:right">
      </div>

  </header>
</template>
<script>
import SbolLink from "../components/SbolLinkText";

export default {
  props: ["header"],
  data() {
    return {};
  },
  methods: {},
  components: {
    SbolLink,
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
