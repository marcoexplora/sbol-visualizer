<template>
  <header id="heading">
    <div>
      <b>{{ header.name }}</b>
      (no description found)
    </div>
    <ul>
      <li>
        Part ID:
        <span>{{ header.partID }}</span>
      </li>
      <!--
            <li> Alternative Name: <span>{{ header.alternativeName }}</span>  </li>
            <li> Version: <span>{{ header.version }}</span> </li>
            <li> Division: <span>{{ header.division }}</span> </li>
            <li> Parent Sequence: <span>{{ header.parentSequence }}</span> </li>
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
  methods: {}
};
</script>

<style scoped>
header {
  padding-bottom: 10px;
  min-height: 135px;
}
div {
  margin: 0;
  background-color: #f0f2f5;
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 5px;
}
div b {
  display: block;
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
