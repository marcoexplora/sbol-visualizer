  <template>
    <div>
      <div  v-bind:class="[item == selected ? 'selected' : '']">
      <div class="h1 bold" >
        <span v-if="item.propriety.components"
              v-bind:class="[ showSubComponent ? 'open' : 'close']"
              @click="updateBreadcrumbs()"
              class="sub_components_controller">
          <sbol-icon-open-collapse-list :open="showSubComponent"/>
        </span>


        <span  @click="detailItem(item)">
          {{ item.name }}
        </span>

      </div>

      <div class="text-muted-black h2"  @click="detailItem(item)">
        <b>Direction:</b>
        <span>{{ item.propriety.Direction }}</span>
        <span v-if="item.propriety.end > 0">({{item.propriety.start}}..{{ item.propriety.end }})</span>
      </div>
      </div>
      <div v-bind:class="[showSubComponent ? 'show' : 'hide']" class="components_list">
        <ul v-if="item.propriety.components" :id="item.name  + 'sub' + level" >
          <li v-for="(sub, index) in item.propriety.components" :key="index" class="item">
            <sbol-tree-list
                :item="sub"
                :bestview="bestView(sub)"
                :level="level + 1"
                :selected="selected"
                :visible="visible"
                :wcid="wcid"
                v-bind:breadcrumbs="breadcrumbs"  ></sbol-tree-list>
          </li>
        </ul>
      </div>

    </div>

  </template>
  <script>
  import SbolTreeList from "@/components/SbolTreeList";
  import SbolIconOpenCollapseList from "@/components/SbolIconOpenCollapseList";

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
      breadcrumbs: {type : Array},
      wcid : { type : Number},
      visible: {},
      bestview: {},
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
    },
    methods :{
      changeVisible(ann) {
        const annotations = ann.length == 1 ? [ann] : ann;
        eventBus.$emit("set-visible",{ annotations : annotations, wcid : this.wcid})
      },
      bestView(ann){
        if(typeof  ann.propriety.components != "undefined"){
          return ann.propriety.components
        }else{
          return this.item.propriety.components
        }
      },
      detailItem(ann) {
        //this.changeVisible(this.bestview);
        eventBus.$emit("select-annotation", { annotation : ann, wcid : this.wcid});
      },
      updateBreadcrumbs(){
        if(this.showSubComponent){
          eventBus.$emit("update-breackcrumbs", { item : null, level : this.level, wcid : this.wcid});
        }else{
          eventBus.$emit("update-breackcrumbs", { item : this.item, level : this.level, wcid : this.wcid});
        }
      }
    },
    watch: {
      breadcrumbs: {
        immediate: true,
        handler: function(n, o) {
          if(n != null){
            //console.log('we should update the list')
            this.showSubComponent = this.breadcrumbs[this.level + 1] === this.item;
          }
        }
      },
    },
  };
  </script>
  <style scoped>

  li.item{
    padding: 10px 0 0 0;
  }
  .sub_components_controller{
    color: #3578b6;
    font-size: 0.8em;
    vertical-align: revert;
  }
  .selected{
    background: #dee5ea;
    transition: 200ms;
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
