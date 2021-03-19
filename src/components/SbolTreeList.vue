  <template>
    <div>
      <div  v-bind:class="[item === selected ? 'selected' : '',showSubComponent ? 'highlighed' : '']">
      <div class="h1">

        <span v-if="item.propriety.components"
              v-bind:class="[ showSubComponent ? 'open' : 'close']"
              @click="accordionUpdate(item)"
              class="sub_components_controller pointer">
          <sbol-icon-open-collapse-list :open="showSubComponent"/>
        </span>

        <span class="pointer"  @click="selectByClickingOnName(item)" v-bind:class="[selected === item ? 'itemSelected' : '']">
          {{ item.name }} <span class="tag" v-if="item.propriety.tag && item.propriety.tag !== ''"><SbolIconCheck/></span>
        </span>

        <span v-if="item.propriety.components == visible" class="glasses">
            <SbolIconGlasses  active="true" alt="this element is displayed on the map"/>
         </span>

      </div>

      <div class="text-muted-black h2"  @click="selectByClickingOnName(item)">
        <span>Direction: </span>
        <span>{{ item.propriety.Direction }}</span>
        <span v-if="item.propriety.end > 0">({{item.propriety.start}}..{{ item.propriety.end }})</span>
      </div>

      </div>

      <div v-bind:class="[showSubComponent ? 'show' : 'hide', item.propriety.components == visible ? 'visible':'' ]" class="components_list">
        <ul v-if="item.propriety.components" :id="item.name  + 'sub' + level" >
          <li v-for="(sub, index) in item.propriety.components" :key="index" class="item">
                <sbol-tree-list
                    :item="sub"
                    :parent="item"
                    :level="level + 1"
                    :selected="selected"
                    :visible="visible"
                    :wcid="wcid"
                    v-bind:breadcrumbs="breadcrumbs" ></sbol-tree-list>
          </li>
        </ul>
      </div>

    </div>

  </template>

  <script>
  import SbolTreeList from "@/components/SbolTreeList";
  import SbolIconOpenCollapseList from "@/components/SbolIconOpenCollapseList";
  import SbolIconGlasses from "@/components/SbolIconGlasses";
  import SbolIconCheck from "@/components/SbolIconCheck"

  import eventBus from "@/lib/eventBus";

  export default {
    props: {
      item: {
        type: Object
      },
      parent: {
        type: Object
      },
      level: {
        type: Number,
        default: 0
      },
      breadcrumbs: {type : Array},
      wcid : { type : Number},
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
      SbolIconGlasses,
      SbolIconCheck
    },
    methods :{
      selectByClickingOnName(ann) {
        const _level = this.level > 1 ? this.level -1 : 0;
        eventBus.$emit("select-annotation", { annotation : ann, wcid : this.wcid});
        eventBus.$emit("update-breackcrumbs", { item : this.parent, level : _level , wcid : this.wcid});
      },
      accordionUpdate(item){
        if(this.showSubComponent){
          eventBus.$emit("update-breackcrumbs", { item : null, level : this.level, wcid : this.wcid});
        }else{
          eventBus.$emit("update-breackcrumbs", { item : this.item, level : this.level, wcid : this.wcid});
          eventBus.$emit("select-annotation", { annotation : item, wcid : this.wcid});
        }
      },
      amImuted(){
        return this.breadcrumbs.length > level && this.showSubComponent
      }
    },
    watch: {
      breadcrumbs: {
        immediate: true,
        handler: function(n, o) {
          if(n != null){
            this.showSubComponent = this.breadcrumbs[this.level + 1] === this.item;
          }
        }
      },
      selected : {
        immediate: true,
        handler: function(n, o) {
          if(n != null){
            if(this.item === this.selected){
              if(typeof this.$el !== 'undefined'){
                this.$el.scrollIntoViewIfNeeded()
              }
            }
           }
        }
      },
    },
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
.muted {
  color : #7d7d7d;
}

  .tag{
    vertical-align: sub;
    padding-left: 0.3em;
    font-size: 0.95em;
  }

  li.item{
    padding: 10px 0 0 0;
  }
  .sub_components_controller{
    color: #3578b6;
    font-size: 0.8em;
    vertical-align: revert;
  }
  .selected{
    background: #b1b1b124;
    transition: 200ms;
  }
  .components_list.hide{
    overflow:hidden;
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
  ul{
    list-style: none;
    padding-left: 10px;
  }
  .glasses{
    float: right;
  }
  </style>
