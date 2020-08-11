<template>
  <div class="sbolChart" :ref="'sbolChart'">
    <div style="margin: auto;width: fit-content">
      <div
        v-for="(item, index) in computedGlyphAnnotations"
        :ref="'glyphs'"
        class="glyphs tooltip"
        :class="{ active: activeAnnotation === 'glyph_' + item.pk }"
        :key="index"
        @click="detailItem(index)"
      >
        <div class="tooltiptext">{{ item.name }}</div>

        <img style="width:100%" :src="item.path" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["annotations", "annotation"],
  data() {
    return {
      activeAnnotation: "none",
      containerWidth: 0,
      parentWidth: 0,
    };
  },
  computed: {
    computedContainerWidth() {
      return this.containerWidth;
    },
    computedGlyphAnnotations() {
      if (this.annotations) {
        this.annotations.map((key, index) => {
          this.annotations[
            index
          ].path = `https://vows.sbolstandard.org/glyph/${this.annotations[index].SBOL}/png`;

          this.annotations[index].index = index;
        });

        return this.annotations;
      }
      return [];
    },
  },
  methods: {
    detailItem(a) {
      console.log("detailItem : " + a);
      this.$emit("selectedAnnotation", a);
    },
    selectedAnnotation(a) {
      console.log("selectedAnnotation");
      this.activeAnnotation = "glyph_" + a.pk;
      console.log("this.activeAnnotation " + this.activeAnnotation);
      setTimeout(() => {
        this.$refs.glyphs[a.index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }, 100);
    },
  },
  watch: {
    annotation(a) {
      this.selectedAnnotation(a);
    },
  },
};
</script>

<style scoped>
.sbolChart {
  height: 8em;
  padding: 5em 1em 0em 1em;
  white-space: nowrap;
  overflow-x: scroll;
  background-color: #f1f2f5;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
}

.sbolChart::-webkit-scrollbar {
  height: 10px;
}

.sbolChart::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #c0c0c0;
}

.sbolChart::-webkit-scrollbar-track {
  background-color: #d0d0d0;
}

div.glyphs {
  width: 55px;
  height: 60px;
  vertical-align: middle;
  border: 2px solid #f1f2f5;
}

img {
  width: 100%;
}

.glyphs.active {
  border-bottom: 2px solid red;
}

.active .tooltip {
  visibility: visible !important;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted #fff;
}

.glyph.active {
  background-color: red;
}

.tooltip .tooltiptext {
  top: 0;
  visibility: hidden;
  background-color: #fff;
  text-align: center;
  padding: 5px;
  border: solid 1px #e5e5e5;
  border-radius: 5px;
  position: absolute;
  top: -4em;
  left: -50px;
  z-index: 1;
  width: 12em;
  font-size: 0.8em;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
