<template>
  <section class="blue-container leftUpcorner">
    <div>
      <main>
        <h1 style="font-size: 20px;color:#B8EF67;font-weight: bold">
          SBOL viewer
        </h1>
        <div class="boxUp">
          <box-arrow-up/>
        </div>
      </main>
      <slot></slot>
      <div class="text-muted-white small version">Verison no. {{ version }}</div>
      <div class="text-muted-white small powered">
        Powered by <a class="white" href="https://getstarted.doulix.com/" target="__blank">DOULIX</a>
      </div>
    </div>
  </section>
</template>

<script>

import BoxArrowUp from "../components/SbolBoxArrowUp";

import settings from "../settings"


export default {
  props: [],
  data() {
    return {
      version: "0.0.0",
      message: ""
    };
  },
  methods: {},
  mounted: function () {
    this.version = settings.version;
  },
  components: {
    BoxArrowUp,
  },
};
</script>

<style scoped>

section {
  position: relative;
  height: 120px;
}

main {
  position: absolute;
  text-align: center;
  width: 100%;
}

.boxUp {
  font-size: 2em;
  text-align: center;
  color: #FFF;
  margin-top: -10px;
}

.version {
  position: absolute;
  left: 10px;
  bottom: 10px;
}

.powered {
  position: absolute;
  right: 10px;
  bottom: 10px;
}

.leftUpcorner {
  border-radius: 0 5px 5px 5px;
  background-color: #0078b6;
}
</style>
