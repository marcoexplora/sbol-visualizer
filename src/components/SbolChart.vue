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

        <img :src="item.path" :class="item.class" />
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
          this.annotations[index].class = `${this.annotations[
            index
          ].SBOL.replace("SO:", "SO_")} ${this.annotations[index].direction}`;
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
  height: 7em;
  padding: 1em;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;

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
  position: relative;
}
.glyphs {
  /* border: 1px solid red; */
  width: 75px;
  height: 75px;
}
img {
  width: 75px;
  /* border-bottom: 2px solid green; */
  position: absolute;
  bottom: 0px;
}

img.RV {
  transform: scaleX(-1);
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
  top: -1em;
  left: -50px;
  z-index: 1;
  width: 12em;
  font-size: 0.8em;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

.BW {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.SO_0000699,
.SO_0001236,
.SO_0001237,
.SO_0001688,
.SO_0001687,
.SO_0001977,
.SO_0001956,
.SO_0000699,
.SO_0001236,
.SO_0001688,
.SO_0001687,
.SO_0000804,
.SO_0000627,
.SO_0001263,
.SO_0000834,
.SO_0001955,
.SO_0001546,
.SO_0001979,
.SO_0000616,
.SO_0000319,
.SO_0000327,
.SO_0000616,
.SO_0000319,
.SO_0000327,
.SO_0000110 {
  bottom: 10px;
}
.SO_0001691,
.SO_0000830,
.SO_0002211 {
  bottom: calc(-35%);
}
.SO_0000553,
.SO_0000316,
.SO_0001975,
.SO_0001976 {
  bottom: calc(-18%);
}
.SO_0000316,
.SO_0000188,
.SO_0000296,
.SO_0000724,
.SO_0000839 {
  bottom: calc(-15%);
}
.SO_0005850 {
  bottom: calc(-50% + 25px);
}
.SO_0000057,
.SO_0000409,
.SO_0000299 {
  bottom: -11px;
}
.SO_0000139 {
  bottom: -7px;
}

/* }
.SO_0000031 {
  width: 75px;
}
.SO_0001953 {
  width: 70px;
  margin-bottom: 2px;
} */
</style>
