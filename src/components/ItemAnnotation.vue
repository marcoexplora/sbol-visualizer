<template>
  <li
    @click="detail"
    :class="{ active: hover }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    {{ id }} - {{ annotation.name }}
    {{ hover }}
  </li>
</template>
<script>
export default {
  props: ["id", "annotation"],
  data() {
    return {
      hover: false
    };
  },
  methods: {
    detail() {
      this.$emit("detail", this.annotation);
    }
  }
};
</script>
<style scoped>
</style>
