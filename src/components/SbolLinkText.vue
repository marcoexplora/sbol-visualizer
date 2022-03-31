<template>
  <a v-bind:href="url" target="__blank">
    <slot></slot>
    <Info />
  </a>
</template>

<script>
import Info from "@/components/icons/SbolIconInfo";

export default {
  props: ["url"],
  data() {
    return {};
  },
  methods: {},
  components: {
    Info,
  },
};
</script>

<style scoped>
</style>
