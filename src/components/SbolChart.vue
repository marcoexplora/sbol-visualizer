<template>
  <div class="sbolChart" :ref="'sbolChart'" v-bind:style="{ width : graphwidth + 'px'}" >

    <div style="margin: 20px auto auto auto;width: fit-content" >
      <div
          v-for="(item, index) in computedGlyphAnnotations"
          ref="glyphs"
          :class="item.class"
          :key="index"
          @click="detailItem(item)"
      >
        <div class="tooltiptext">{{ item.name }}</div>
        <div v-if="selected === item" class="selected"></div>
        <img :src="item.path" :id="item.index" v-bind:ref="item.index" :alt="item.propriety.sequenceOntology" @error="setAltImg" />
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/lib/eventBus";

export default {
  props: {
    "annotations" : { type : Array },
    "selected": { type : Object },
    "graphwidth" : { type : Number},
    "wcid" : { type :Number}
  },
  data() {
    return {
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
          let sbol = this.annotations[index].propriety.sequenceOntology;

          this.annotations[
              index
              ].path = `https://vows.sbolstandard.org/glyph/${sbol}/png`;

          this.annotations[index].class = `${sbol.replace("SO:", "SO_")} ${
              this.annotations[index].direction
          } glyphs tooltip`;

          this.annotations[index].index = `${index}_id_${parseInt(Math.random() * 100000)}`;
        });
        return this.annotations;
      }
      return [];
    },
    selectedElement(){
      return this.selected.filter((tags)=>{
        return tags.tag === "showDetails"
      }).element
    }
  },
  methods: {
    amIselected(ann){ //todo: check if this is legacy
      this.selectedElement() === ann;
    },
    detailItem(ann) {
      eventBus.$emit("select-annotation", { annotation : ann, wcid : this.wcid});
      //  eventBus.$emit("set-visible",{ annotations : annotations, wcid : this.wcid})
      //   eventBus.$emit("select-annotation", { annotation : ann, wcid : this.wcid});


    },
    selectedAnnotation: function (ann) {
      if(typeof ann != 'undefined' && ann != null){
        setTimeout(() => {
          if(typeof this.$refs[ann.index] != 'undefined') {
            this.$refs[ann.index][0].scrollIntoView({
              behavior: 'smooth',
              block: "nearest",
              inline: "center",
            });
          }
        }, 100);

      }
    },
    setAltImg(event) {
      event.target.src = "https://vows.sbolstandard.org/glyph/SO:0000313/png";
    },
    setWideth(){
      return `width:${graphwidth}px`
    }
  },
  watch: {
    selected: {
      immediate: true,
      handler: function(n, o) {
        if(n != null){
          this.selectedAnnotation(n);
        }
      }
    },
  },
};
</script>

<style scoped>
.sbolChart {
  height:142px;
  padding: 1em;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px 5px 0 0;
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
  bottom: 0;
}

.RV img{
  /*transform: scaleX(-1);*/
  transform: rotate(180deg);
}

.glyphs .selected {
  background: #dee5ea;
  width: 75px;
  height: 9em;
  position: absolute;
  top: -2em;
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
  top: -2em;
  opacity: 0;
  background-color: #fff;
  text-align: center;
  padding: 5px 10px;
  border: solid 1px #e5e5e5;
  position: absolute;
  z-index: 1;

  word-wrap: break-word;
  font-size: 0.8em;
}

.tooltip:hover .tooltiptext {
  opacity: 1;
  transition: opacity 0.5s;
}

.BW {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.SO_0000699 img,
.SO_0001236 img,
.SO_0001237 img,
.SO_0001688 img,
.SO_0001687 img,
.SO_0001977 img,
.SO_0001956 img,
.SO_0000699 img,
.SO_0001236 img,
.SO_0001688 img,
.SO_0001687 img,
.SO_0000804 img,
.SO_0000627 img,
.SO_0001263 img,
.SO_0000834 img,
.SO_0001955 img,
.SO_0001546 img,
.SO_0001979 img,
.SO_0000616 img,
.SO_0000319 img,
.SO_0000327 img,
.SO_0000616 img,
.SO_0000319 img,
.SO_0000327 img,
.SO_0000110 img {
  bottom: 10px;
}
.SO_0001691 img,
.SO_0000830 img,
.SO_0002211 img {
  bottom: calc(-35%);
}
.SO_0000553 img,
.SO_0000316 img,
.SO_0001975 img,
.SO_0001976 img {
  bottom: calc(-18%);
}
.SO_0000316 img,
.SO_0000188 img,
.SO_0000296 img,
.SO_0000724 img,
.SO_0000839 img {
  bottom: calc(-15%);
}
.SO_0005850 img {
  bottom: calc(-50% + 25px);
}
.SO_0000057 img,
.SO_0000409 img,
.SO_0000299 img {
  bottom: -11px;
}
.SO_0000139 img {
  bottom: -7px;
}
</style>
