  <template>
    <div>
      <div  v-bind:class="[item === selected ? 'selected' : '']">
      <div class="h1 bold">
        <span v-if="item.propriety.components"
              v-bind:class="[ showSubComponent ? 'open' : 'close']"
              @click="accordionUpdate(item)"
              class="sub_components_controller pointer">
          <sbol-icon-open-collapse-list :open="showSubComponent"/>
        </span>

        <span class="pointer"  @click="selectByClickingOnName(item)" v-bind:class="[selected === item ? 'itemSelected' : '']">
          {{ item.name }}
          <span v-if="item.propriety.components == visible" class="glasses">
            <SbolIconGlasses  active="true" alt="this element is displayed on the map"/>
          </span>
        </span>
      </div>

      <div class="text-muted-black h2"  @click="selectByClickingOnName(item)">
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
      SbolIconGlasses
    },
    methods :{
      selectByClickingOnName(ann) {
        eventBus.$emit("select-annotation", { annotation : ann, wcid : this.wcid});
        eventBus.$emit("update-breackcrumbs", { item : this.parent, level : this.level - 1 , wcid : this.wcid});
      },
      accordionUpdate(item){
        if(this.showSubComponent){
          eventBus.$emit("update-breackcrumbs", { item : null, level : this.level, wcid : this.wcid});
        }else{
          eventBus.$emit("update-breackcrumbs", { item : this.item, level : this.level, wcid : this.wcid});
          eventBus.$emit("select-annotation", { annotation : item, wcid : this.wcid});
        }
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
              this.$el.scrollIntoViewIfNeeded()
            }
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
    height: 0;
    margin: 0;
    padding: 0;
    border: 0;
  }
  .components_list {
    margin: 0 0 0 5px;
    border-left: 2px solid #dee5ea;
  }
  ul{
    list-style: none;
    padding-left: 10px;
  }
  .glasses{
    float: right;
    padding: 0.2em 1em 0 0;
  }
  </style>
