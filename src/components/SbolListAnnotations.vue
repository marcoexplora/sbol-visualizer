<template>
  <div class="wrap-list" ref="list">
    <div class="search">
      <input type="text" aria-label="search input" class="search-input" placeholder="Search in annotations"
             v-model="filter"/>
    </div>

    <div class="wrap-section">
      <section>
        <ul class="search-list" ref="ItemsTree">
          <li v-if="annotations.length === 0">No Sbol component found</li>
          <li v-if="annotations.length > 0" class="item">
            <div class="h1" v-bind:class="[selected.style === 'root' ? 'selected' : 'nope']">
              <span @click="accordionUpdate()"
                    v-bind:class="[showSubComponent ? 'open' : 'close']"
                    class="sub_components_controller pointer">
                  <sbol-icon-open-collapse-list :open="showSubComponent"/>
              </span>
              <span @click="selectMe(annotations)" class="pointer" >
                {{ root.partID }}
              </span>
              <span v-if="annotations === visible" class="glasses">
                    <SbolIconGlasses active="true" alt="this element is displayed on the map"/>
              </span>

            </div>
            <div v-bind:class="[showSubComponent ? 'show' : 'hide',annotations === visible ? 'visible':'' ]" class="components_list">
              <ul v-for="(item, index) in annotations" :key="index" class="item">
                <li class="item">

                  <sbol-tree-list
                      :item="item"
                      :parent="parentRoot"
                      :visible="visible"
                      :wcid="wcid"
                      :key="updateRender"
                      v-bind:breadcrumbs="breadcrumbs"
                      v-bind:level="0"
                      v-bind:selected="selected">
                  </sbol-tree-list>

                </li>
              </ul>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>

import SbolTreeList from "@/components/SbolTreeList";
import SbolIconGlasses from "@/components/SbolIconGlasses";
import SbolIconOpenCollapseList from "@/components/SbolIconOpenCollapseList";

import eventBus from "@/lib/eventBus";

export default {
  props: {
    annotations: {type: Array},
    selected: {type: Object},
    root: {type: Object},
    visible: {},
    wcid: {type: Number},
    breadcrumbs: {type: Array},
  },
  data() {
    return {
      filter: "",
      showSubComponent: true,
      updateRender: 0
    };
  },
  components: {
    SbolTreeList,
    SbolIconGlasses,
    SbolIconOpenCollapseList,
  },
  computed: {
    parentRoot() {
      return {
        propriety : { components : this.annotations }
      }
    },
  },
  methods: {
    accordionUpdate(){
      this.showSubComponent = !this.showSubComponent;
      eventBus.$emit("update-breackcrumbs", { item : null, level : 0, wcid : this.wcid});
    },
    selectMe(ann) {
      eventBus.$emit("select-annotation", {annotation: { style:'root' }, wcid: this.wcid});
      eventBus.$emit("update-breackcrumbs", { item : null, level : 0, wcid : this.wcid});
    },
    search(value){
      eventBus.$emit("search", { searchString : value, level : 0, wcid : this.wcid});
    }
  },
  watch: {
    filter(v) {
      eventBus.$emit("search", { searchString : v, level : 0, wcid : this.wcid});
      this.updateRender += 1;
    }
  }

};
</script>
<style scoped>



h1, .h1 {
  padding: 8px 0 2px 0;
  font-size: 16px
}

h2, .h2, .small {
  padding: 0 0 14px 0;
  font-size: 14px;
}


.search-list h1,
.search-list h1 {
  color: #4d4d4c
}

.sub_components_controller {
  color: #3578b6;
  font-size: 0.8em;
  vertical-align: revert;
}

.search {
  margin: 0;
  font-size: 10px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 5px;
  background-color: #f0f2f5;
}

.bold {
  font-weight: bold;
}

.wrap-list {
  height: 550px;
  overflow: hidden;
}

.wrap-section {
  margin: 5px 0 5px 0;
  border: 1px solid #CCC;
  border-radius: 5px;
  overflow: hidden;
  background-color: #fff;
  height: 490px;
}

.selected{
  background:  #b1b1b124;
  transition: 200ms;
}

section {
  height: 490px;
  overflow-y: scroll;
}

section * {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
  Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.search-input {
  width: 90%;
  height: 3em;
  font-size: 1.2em;
  border: none;
  background-color: #f0f2f5;
  padding-left: 10px;
  outline: none;
}

.search-list {
  list-style: none;
  padding: 0;
  text-align: left;
  min-height: 400px;
  overflow: hidden;
  margin: 0;
  border-radius: 5px;
  border-bottom: 1px;
  position: relative;
}

ol {
  padding: 0
}

li.item {
  position: relative;
  padding: 10px;
  background-color: #fff;
}

li.item:last-child {

}

.search-list > li b {
  padding-right: 5px;
}

.search-list > li ul {
  padding-left: 0;
  list-style: none;
}

.search-list > li span {
  font-size: 0.9em;
}

.text-muted-black {
  color: #6c757d;
}

.small {
  font-size: 80%;
}

.px-1 {
  padding: 5px 0;
}

.components_list.hide {
  overflow: hidden;
  height: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.components_list.visible {
  border-left: 2px solid #0078b6;
}

.components_list {
  margin: 0 0 0 0.5em;
  border-left: 2px solid #e5e5e5;
}

ul {
  list-style: none;
  padding-left: 10px;
}

.glasses{
  float: right;
}
.glasses svg{
  font-size:1.2em;
}
</style>
