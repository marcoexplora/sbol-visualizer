<template>
  <div id="sbolChart" v-bind:style="{ width: mainWidth } + 'px'" :ref="'sbolChart'">
    <div v-bind:style="{ width: computedContainerWidth + 'px' }">
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
// import sbolcomponents from "../SBOLcomponents.json";
// import settings from "../visulizer_setting.json";

export default {
  props: ["annotations", "annotation", "mainWidth"],
  data() {
    return {
      activeAnnotation: "none",
      containerWidth: 0,
      parentWidth: 0
    };
  },
  computed: {
    computedContainerWidth() {
      return this.containerWidth;
    },
    computedGlyphAnnotations() {
      if (this.annotations) {
        this.annotations.map((key, index) => {
          // const sbolPath =
          //   sbolcomponents[this.annotations[index].SBOL].rappresentation
          //     .imagePath;
          // const externalImage = settings.imageExternalSource;

          // if (settings.imageExternalSource.indexOf("${path}")) {
          //   this.annotations[index].path = externalImage.replace(
          //     "${path}",
          //     sbolPath
          //   );
          // } else {
          //   this.annotations[index].path =
          //     sbolcomponents[
          //       this.annotations[index].SBOL
          //     ].rappresentation.imagePath;
          // }
          console.log(
            "this.annotations[index].SBOL " + this.annotations[index].SBOL
          );
          // this.annotations[index].path =
          //   sbolcomponents[
          //     this.annotations[index].SBOL
          //   ].rappresentation.imagePath;
          // https://vows.sbolstandard.org/glyph/SO:0000031/png

          this.annotations[
            index
          ].path = `https://vows.sbolstandard.org/glyph/${this.annotations[index].SBOL}/png`;
          console.log(`
          index ${index}
          this.annotations[index].SBOL ${this.annotations[index].SBOL}
          https://vows.sbolstandard.org/glyph/${this.annotations[index].SBOL}/png`);
          this.annotations[index].index = index;
        });

        return this.annotations;
      }
      return [];
    }
  },
  methods: {
    detailItem(a) {
      window.console.log("ooo", this.annotations[a]);
      this.$emit("selectedAnnotation", a);
    },
    selectedAnnotation(a) {
      this.activeAnnotation = "glyph_" + a.pk;
      setTimeout(() => {
        const offset =
          this.$refs.glyphs[a.index].offsetLeft > this.mainWidth
            ? this.$refs.glyphs[a.index].offsetLeft - this.mainWidth
            : 0;
        this.$refs.sbolChart.scrollLeft = offset;
      }, 100);
    }
  },
  watch: {
    annotation(a) {
      this.selectedAnnotation(a);
    }
  }
};
</script>

<style scoped>
#sbolChart {
  height: 8em;
  padding-top: 5em;
  padding-left: 1em;
  white-space: nowrap;
  overflow-x: scroll;
  background-color: #f1f2f5;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
}

#sbolChart::-webkit-scrollbar {
  height: 10px;
}

#sbolChart::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #c0c0c0;
}

#sbolChart::-webkit-scrollbar-track {
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

/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted #fff; /* If you want dots under the hoverable text */
}

.glyph.active {
  background-color: red;
}
/* Tooltip text */
.tooltip .tooltiptext {
  top: 0;
  visibility: hidden;
  background-color: #fff;
  /* color: #000; */
  text-align: center;
  padding: 5px;
  border: solid 1px #e5e5e5;
  border-radius: 5px;
  /* Position the tooltip text - see examples below! */

  position: absolute;
  top: -4em;
  left: -50px;
  z-index: 1;
  width: 12em;
  font-size: 0.8em;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
