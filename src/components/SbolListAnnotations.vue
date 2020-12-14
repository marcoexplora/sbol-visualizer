<template>
  <div class="wrap-list">
    <div class="search">
      <input type="text" aria-label="search input" class="search-input" placeholder="Search in annotations"
             v-model="filter"/>
    </div>

    <div class="wrap-section">
      <section>

        <ul class="search-list">

          <li v-if="selectedItems.length === 0">No Sbol component found</li>
          <li v-if="selectedItems.length > 0" class="item">
            <div class="h1 bold">
              <span v-on:click="showSubComponent = !showSubComponent"
                    v-bind:class="[showSubComponent ? 'open' : 'close']"
                    class="sub_components_controller pointer">
                  <sbol-icon-open-collapse-list :open="showSubComponent"/>
                </span>
              <span @click="selectMe(selectedItems)" class="pointer">
                {{ root.partID }}
              </span>

            </div>
            <div v-bind:class="[showSubComponent ? 'show' : 'hide']" class="components_list">
              <ul v-for="(item, index) in selectedItems" :key="index" class="item">
                <li class="item">

                  <sbol-tree-list
                      :item="item"
                      :parent="parentRoot"
                      :wcid="wcid"
                      v-bind:breadcrumbs="breadcrumbs"
                      v-bind:level="0"
                      v-bind:selected="selected"
                      :visible="visible">
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
import SbolIconGlasses from "@/components/SbolIconGlasses"
import SbolIconOpenCollapseList from "@/components/SbolIconOpenCollapseList";
import eventBus from "@/lib/eventBus";

export default {
  props: {
    annotations: {type: Array},
    selected: {type: Object},
    root: {type: Object},
    visible: {},
    wcid: {type: Number},
    breadcrumbs: {type: Array}
  },
  data() {
    return {
      filter: "",
      showSubComponent: true
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
    //todo: rename selectedItems in searchItems and make it work on multiples levels
    selectedItems() {
      if (typeof this.annotations !== 'undefined') {
        return this.annotations.filter((so) => {
          if (this.filter === "") {
            return so;
          }

          if (/^\d+$/.test(this.filter)) {
            const loc = parseInt(this.filter);
            return so.start <= loc && so.end >= loc;
          } else {
            return (
                so.name.toLowerCase().includes(this.filter.toLowerCase()) ||
                so.start.toString().includes(this.filter.toString()) ||
                so.SBOL.toString().includes(this.filter.toString()) ||
                so.end.toString().includes(this.filter.toString()) ||
                so.direction.toLowerCase().includes(this.filter.toString())
            );
          }
        });
      } else {
        return []
      }
    },
  },
  methods: {

    selectMe(ann) {
      eventBus.$emit("select-annotation", {annotation: null, wcid: this.wcid});
    }
  }
};
</script>
<style scoped>
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
  height: 490px;
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

.components_list {
  margin: 0 0 0 5px;
  border-left: 2px solid #dee5ea;
}

ul {
  list-style: none;
  padding-left: 10px;
}

</style>
