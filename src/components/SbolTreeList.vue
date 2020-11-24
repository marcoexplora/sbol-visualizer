<template>
  <div>
    <div  v-bind:class="[item == selected ? 'selected' : '']">
    <div class="h1 bold" >
      <span v-if="item.propriety.components"
            v-on:click="showSubComponent = !showSubComponent"
            v-bind:class="[showSubComponent ? 'open' : 'close']"
            class="sub_components_controller">
        <sbol-icon-open-collapse-list :open="showSubComponent"/>
      </span>
      <span  @click="detailItem(item)">
        {{ item.name }}
      </span>

      <span v-if="item.propriety.components"
            @click="changeVisible(item.propriety.components)"
            class="glasses">
          <sbol-icon-glasses :active="item.propriety.components == visible"/>
       </span>

    </div>


    <div class="text-muted-black h2"  @click="detailItem(item)">
      <b>Direction:</b>
      <span>{{ item.propriety.Direction }}</span>
      <span v-if="item.propriety.end > 0">({{item.propriety.start}}..{{ item.propriety.end }})</span>
    </div>
    </div>
    <div  v-bind:class="[showSubComponent ? 'show' : 'hide']" class="components_list">
      <ul v-if="item.propriety.components" :id="item.name  + 'sub' + level" >
        <li v-for="(sub, index) in item.propriety.components" :key="index" class="item">
          <sbol-tree-list :item="sub" :level="level + 1" :selected="selected" :visible="visible" :breadcrumbs='breadcrumbs ? breadcrumbs  +" / " + item.name : item.name'  ></sbol-tree-list>
        </li>
      </ul>
    </div>

  </div>

</template>
<script>
import SbolTreeList from "@/components/SbolTreeList";
import SbolIconOpenCollapseList from "@/components/SbolIconOpenCollapseList";
import SbolIconGlasses from "@/components/SbolIconGlasses"

import eventBus from "@/lib/eventBus";

export default {
  props: {
    item: {
      type: Object
    },
    level: {
      type: Number,
      default: 0
    },
    breadcrumbs: {
      type : String
      },
    visible: {},
    selected: {}

  },
  name: 'sbol-tree-list',
  data() {
    return {
      showSubComponent : false,
      filter: "",
    };
  },
  components: {
    SbolTreeList,
    SbolIconOpenCollapseList,
    SbolIconGlasses
  },
  methods :{
    changeVisible(ann) {
      const annotations = ann.length == 1 ? [ann] : ann;
      eventBus.$emit("set-visible",annotations)
    },
    detailItem(ann) {
      eventBus.$emit("select-annotation", ann);
    },
  }

};
</script>
<style scoped>

.glasses{
  font-size: 25px;
  position: absolute;
  right: 5px;
  z-index: 1;
}
.close .glasses{
  display: none;
}
li.item{
  padding: 10px 0 0 0;
}
.sub_components_controller{
  color: #3578b6;
  font-size: 0.8em;
  vertical-align: revert;
}
/*.breadcrumbs{
  color: #3578b6;
  margin-top: 10px;
  text-align: center;
  padding: 5px;
}*/
.selected{
  background: #dee5ea;
  margin-right: 40px;
  border-radius: 5px;
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
</style>
