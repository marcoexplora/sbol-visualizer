<template>
  <header class="heading">

      <div style="float:left">
        <h2 class="text-muted">Part id: {{header.partID}}</h2>
        <h1>{{header.name}}</h1>
        <h2 class="text-muted" style="padding-bottom: 24px">Version no.: {{ header.version }}</h2>

        <h2 class="text-muted" >Created by: {{header.creator}}</h2>

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
header *{
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
  Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
header {
  overflow-x: hidden;
  height: calc(14vh);
  overflow-y: hidden;

  margin: 0 0 5px 0;
  background-color: #0078b6;
  padding:10px;
  border: 1px solid #fff;
  border-radius: 5px;
}

header h2,h1{
  margin: 0px
}
h1,.h1 {
  font-size: 24px
}
h2,.h2{
  font-size: 14px;

}

.text-muted{
  color: #e0e9f3;
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
