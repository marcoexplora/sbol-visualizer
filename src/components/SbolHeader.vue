<template>
  <header id="heading">
    <div>
      <b>{{ header.name }}</b>
      <br />
      <span class="cap">{{ header.alternativeName }}</span>
    </div>
    <ul>
      <li>
        Part ID:
        <span>{{ header.partID }}</span>
      </li>

      <li>
        Creator :
        <span class="cap">{{ header.creator }}</span>
      </li>
      <li>
        Version:
        <span>{{ header.version }}</span>
      </li>
      <li>
        Parent Sequence:
        <span>{{ header.parentSequence }}</span>
      </li>
      <!--
      <pre>{{ header }}</pre>
      -->
    </ul>
  </header>
</template>
<script>
export default {
  props: ["header"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
header {
  padding-bottom: 10px;
  min-height: 135px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
span.cap {
  text-transform: capitalize;
}
div {
  margin: 0;
  background-color: #0078b6;
  padding: 10px;
  border: 1px solid #fff;
  color: #fff;
  border-radius: 5px;
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
