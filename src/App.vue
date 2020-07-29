<template>
  <div id="app">
    <h1>Sbol 🔍 develop page</h1>

    <h2>Javascript load</h2>

    <SbolViewer :variable="source" />
  </div>
</template>

<script>
import SbolViewer from "./views/Viewer.vue";

export default {
  name: "app",
  data() {
    return {
      source: null
    };
  },
  methods: {
    loadJson() {}
  },
  components: {
    SbolViewer
  }
};
</script>

<style>
</style>
