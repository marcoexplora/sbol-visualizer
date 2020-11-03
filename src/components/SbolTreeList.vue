<template>
  <div>

    <div class="h1 bold">
      {{ item.name }} ( {{level}} )
    </div>

    <div class="text-muted-black h2">
      <b>Direction:</b>
      <span>{{ item.propriety.Direction }}</span> <span v-if="item.propriety.end > 0">({{
        item.propriety.start
      }}..{{ item.propriety.end }})</span>
    </div>
    <ul v-if="item.components" :id="item.name  + 'sub' + level" >
      <li v-for="(sub, index) in item.components" :key="index" class="item">
        <sbol-tree-list :item="sub" :level="level + 1" :breadcrumbs="item.name"></sbol-tree-list>
      </li>
    </ul>
  </div>

</template>
<script>
import SbolTreeList from "../components/SbolTreeList";

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
      type: String
    }
  },
  name: 'sbol-tree-list',
  data() {
    return {
      filter: "",
    };
  },
  components: {
    SbolTreeList,
  },
  computed: {},
  methods: {
    hasChild(annotations) {
    },
  },
};
</script>
<style scoped>
ul {
  margin: 0;
  padding: 10px 0 10px 5px;
  padding-left: 5px;
  border: 1px solid #e8e8e878;
  background: #e8e8e878;
  border-radius: 5px;
}
</style>
