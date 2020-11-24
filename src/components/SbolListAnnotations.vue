<template>
  <div class="wrap-list">

    <div class="search">
      <input type="text" class="search-input" placeholder="Search in annotations" v-model="filter" />
    </div>

  <div class="wrap-section">
    <section>

      <ul class="search-list">

        <li v-if="selectedItems.length == 0">No Sbol component found</li>

        <li v-if="selectedItems.length > 0" class="item">
          <div class="h1 bold">
              <span v-on:click="showSubComponent = !showSubComponent"
                    v-bind:class="[showSubComponent ? 'open' : 'close']"
                    class="sub_components_controller">
                  <sbol-icon-open-collapse-list :open="showSubComponent"/>
                </span>
            {{root.partID}}
          </div>
          <div  v-bind:class="[showSubComponent ? 'show' : 'hide']" class="components_list">
            <ul v-for="(item, index) in selectedItems" :key="index" class="item">
              <li class="item">
                <sbol-tree-list
                    :item="item"
                    v-bind:level="0"
                    v-bind:selected="selected"
                    v-bind:bestview="selectedItems"
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
  props: ["annotations","selected","root","visible"],
  data() {
    return {
      filter: "",
      showSubComponent : false
    };
  },
  components: {
    SbolTreeList,
    SbolIconGlasses,
    SbolIconOpenCollapseList,
  },
  computed: {
    //todo: rename selectedItems in searchItems and make it work on multiples levels
    selectedItems()  {
      if(typeof this.annotations !== 'undefined'){
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
      }else{
        return []
      }
    },
  },
  methods: {
    changeVisible(ann) {
      eventBus.$emit("set-visible",ann)
    }
  },
};
</script>
<style scoped>
.root{
  font-size: 25px;
  position: absolute;
  top: 0px;
  right: 5px;
  z-index: 1;
}

.search {
  margin: 0;
  font-size: 10px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 5px;
  background-color: #f0f2f5;
}
.bold{
  font-weight: bold;
}
.wrap-list{
  height: 550px;
  overflow: hidden;
}
.wrap-section{
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
  oveerflow:hidden;
  margin: 0;
  border-radius: 5px;
  border-bottom: 1px;
  position: relative;
}
.search-list *{
  color:  #4d4d4c
}

ol{
  padding: 0px
}

li.item {
  position: relative;
  padding: 10px;
  background-color: #fff;
}

li.item:last-child{

}
.search-list > li b {
  padding-right: 5px;
}
.search-list > li ul {
  padding-left: 0;
  list-style: none;
}
filter
.search-list > li span {
  font-size: 0.9em;
}
.text-muted-black {
  color: #6c757d;
}
.small{
  font-size: 80%;
}
.px-1{
  padding:5px 0;
}

.components_list.hide{
  overflow:hidden;
  height: 0px;
  margin: 0;
  padding: 0;
  border: 0;
}
.components_list {
  margin: 0;
  margin-left: 5px;
  border-left: 2px solid #dee5ea;
}
ul{
  list-style: none;
  padding-left: 10px;
}

.sub_components_controller{
  color: #3578b6;
  font-size: 0.8em;
  vertical-align: revert;
}
</style>
