<template>
  <div class="wrap-list">
    <div class="search">
      <input type="text" class="search-input" placeholder="Search in annotations" v-model="filter" />
    </div>

  <div class="wrap-section">
    <section>

      <ul class="search-list">
        <div class="root active" @click="changeVisible(annotations)">
          <sbol-icon-glasses/>
        </div>

        <li v-if="selectedItems.length == 0">No Sbol component found</li>

        <li v-for="(item, index) in selectedItems" :key="index" @click="detailItem(item.index)" class="item">
          <sbol-tree-list  :item="item" v-bind:level="0"  ></sbol-tree-list>
        </li>
      </ul>
    </section>
  </div>
  </div>
</template>
<script>

import SbolTreeList from "@/components/SbolTreeList";
import SbolIconGlasses from "@/components/SbolIconGlasses"
import eventBus from "@/lib/eventBus";

export default {
  props: ["annotations"],
  data() {
    return {
      filter: "",
    };
  },
  components: {
    SbolTreeList,
    SbolIconGlasses
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
    detailItem(so) {
      this.$emit("selectedAnnotation", so);
    },
    changeVisible(ann) {
      eventBus.$emit("set-visible",ann)
    }
  },
};
</script>
<style scoped>
.root{
  position: absolute;
  top: 0px;
  right: 5px;
  z-index: 1;
}
.root.active{
  font-size: 25px;
  color: #0078b6;
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
  border-bottom: 2px solid #d9d9d9;
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
</style>
