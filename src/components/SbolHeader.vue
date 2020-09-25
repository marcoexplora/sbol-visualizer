<template>
  <header class="heading">
    <div class="title">
      <div style="float:left">
        <SbolLink :url="header.persistentIdentity">
          <b>{{ header.name }}</b>
          <br />
          <span class="secondary cap">{{ header.alternativeName }}</span>
        </SbolLink>
      </div>
      <div style="float:right">
        <div class="secondary">
          By
          <span class="cap">{{ header.creator }}</span>
        </div>
        <div class="secondary" style="text-align:right">
          v.
          <span>{{ header.version }}</span>
        </div>
      </div>
    </div>
    <ul>
      <li>
        Part ID:
        <span>{{ header.partID }}</span>
      </li>

      <li>
        Parent Sequence:
        <span>{{ header.parentSequence }}</span>
      </li>
    </ul>
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
.header {
  padding-bottom: 10px;
  min-height: 135px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: calc(30vh);
  overflow-y: scroll;
}
span.cap {
  text-transform: capitalize;
}
.secondary {
  font-size: 0.8em;
}
div.title {
  min-height: 2em;
  margin: 0;
  background-color: #0078b6;
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 5px;
}

div.title,
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
