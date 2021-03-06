<template>
  <div class="sbolChart" :ref="'sbolChart'" v-bind:style="{ width : graphwidth + 'px'}">

    <nav class="breadcrumbs">
        <span v-for="(bread,indexbread) in createBreadcrumbs">
           <a class="pointer"   @click="moveByBreadcrumbs(bread,indexbread )" >
              {{ bread.name }}
          </a>
          <span v-if="indexbread < createBreadcrumbs.length -1">></span>
        </span>
    </nav>

    <div class="scrollable">
      <div class="wrapGlyph" v-bind:style="{ background: `${lineBackground}` }">

        <div v-for="(item, index) in computedGlyphAnnotations"
             ref="glyphs"
             :class="item.class"
             :key="index"
             @click="detailItem(item)">

          <div v-if="!flavourMini" class="tooltiptext">{{ item.name }}</div>

          <div v-if="flavourMini"
               class="mobileHandler pointer"  >
            <span v-if="item.propriety.components"  @click="mobileSelection(item)">+</span>
            <div>{{ item.name }}</div>
          </div>

          <div v-if="selected == item && !flavourMini" class="selected"></div>

          <img :src="item.path" :id="item.index" v-bind:ref="item.index" class="pointer"
               :alt="item.propriety.SO"
               @error="setAltImg"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/lib/eventBus";
import settings from "../settings"

export default {
  props: {
    "annotations": {type: Array},
    "selected": {type: Object},
    "graphwidth": {type: Number},
    "wcid": {type: Number},
    "breadcrumbs": {type: Array},
    "flavourMini": {type: Boolean},
    "level" : { type: Number}
  },
  data() {
    return {
      containerWidth: 0,
      parentWidth: 0,
      lineBackground : `url('${settings.svg_prefix}/tt.svg')`
    };
  },
  computed: {
    createBreadcrumbs() {
      if (this.breadcrumbs.length > 2) {
        const result = [{
          name: "...",
          class : ""
        }]
        return result.concat(this.breadcrumbs.slice(-2));
      } else {
        return this.breadcrumbs.slice(-2)
      }
    },
    computedGlyphAnnotations() {
      if (this.annotations) {
        console.log("this.annotations")
        console.log(this.annotations)
        this.annotations.map((key, index) => {
          let sbol = this.annotations[index].propriety.SO;

          this.annotations[
              index
              ].path = `${settings.svg_prefix}/${sbol.replace("SO:", "SO_")}.svg`;

          this.annotations[index].class = ` ${
              key.propriety.Direction
          } glyphs tooltip`;

          this.annotations[index].index = `${index}_id_${parseInt(Math.random() * 100000)}`;
        });
        return this.annotations;
      }
      return [];
    },
    selectedElement() {
      return this.selected.filter((tags) => {
        return tags.tag === "showDetails"
      }).element
    }
  },
  methods: {
    moveByBreadcrumbs(item,_level){
      if(typeof _level !== 'undefined' ){
        if(item.name != "..."){
            eventBus.$emit("select-annotation", { annotation : item, wcid : this.wcid});
            eventBus.$emit("update-breackcrumbs", { item : item , level : _level -1 , wcid : this.wcid});
        }
      }else{
        eventBus.$emit("mobile-expanse", { item : item, wcid : this.wcid});
      }
    },
    mobileSelection(item){
        eventBus.$emit("mobile-expanse", { item : item, wcid : this.wcid});
    },
    amIselected(ann) { //todo: check if this is legacy
      this.selectedElement() === ann;
    },
    detailItem(ann) {
      eventBus.$emit("select-annotation", {annotation: ann, wcid: this.wcid});
    },
    selectedAnnotation: function (ann) {
      if (typeof ann != 'undefined' && ann != null) {
        setTimeout(() => {
          if (typeof this.$refs[ann.index] != 'undefined' && typeof this.$refs[ann.index][0] != 'undefined') {
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
      event.target.src = `${settings.svg_prefix}/SO_0000110.svg`;  //SO_0000110
    },
    setWideth() {
      return `width:${this.graphwidth}px`
    }
  },
  watch: {
    breadcrumbs: {
      immediate: true,
      handler: function (n, o) {
        if (n != null) {
        }
      }
    },
    selected: {
      immediate: true,
      handler: function (n, o) {
        if (n != null) {
          this.selectedAnnotation(n);
        }
      }
    },
  },
};
</script>

<style scoped>
.sbolChart {
  height: 142px;
  padding: 2em 0 0 0;
  white-space: nowrap;
  background-color: #fff;
  border-radius: 5px 5px 0 0;
  position: relative;
}

.mobileHandler {
  text-align: center;
  font-size: 0.72em;
  margin-top: -25px;
}

.mobileHandler span,.blue {
  color: #0078b6
}

.mobileHandler div {
}

.scrollable {
  padding: 0 20px;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

.breadcrumbs span {
  padding: 0 5px 0 0;
  font-size: 16px;
}

div.glyphs {
  position: relative;
}

.glyphs {
  width: 75px;
  height: 75px;
}

img {
  width: 75px;
}

.RV img {
  transform: rotate(180deg);
}

.glyphs .selected {
  background: #b1b1b124;
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

.wrapGlyph {
  margin: 20px auto auto;
  width: fit-content;
}

.breadcrumbs {
  position: absolute;
  top: 0;
  left: 10px;
  padding: 5px 10px;

  z-index: 1;
  background: #ffffff66;
  border-radius: 20px;
}

.BW {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
