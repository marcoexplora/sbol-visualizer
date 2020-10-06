<template>
  <header class="blue-container"  :class="{showMutable: description}" style="position:relative">
      <div class="mutableDescription">

        <a v-on:click="toogleDescription()"><close-icon/></a>

        <div>
          <span class="bold">Mutable Description:</span>
          {{header.mutableDescription}}
        </div>

      </div>
      <div class="headerDetails">

        <div style="float:left">
          <h2 class="text-muted-white">Part id: {{header.partID}}</h2>
          <h1>{{header.name | truncate(20, '…')}}</h1>
          <h2 class="text-muted-white" style="padding-bottom: 20px">Version no.: {{ header.version }}</h2>
          <h2 class="text-muted-white" >Created by: {{header.creator}}</h2>
        </div>
        <div style="position:absolute;top:5px;right:5px;">
          <span  v-if="this.header.source_link">
            <a  class="va-super py1" :href="this.header.source_link" target="_blank" download>
              <sbol-icon-arrow-in-down/>
            </a>
          </span>
          <a   style="cursor:pointer"   v-on:click="toogleDescription()" class="va-super py1">
            <sbol-icon-info/>
          </a>
          <a class="va-super py1"  :href="this.header.persistentIdentity" target="_blank" >
            <sbol-icon-arrow-up-right/>
          </a>
        </div>

      </div>
  </header>
</template>
<script>
import SbolLink from "../components/SbolLinkText";

import SbolIconInfo from "../components/SbolIconInfo";
import SbolIconArrowInDown from "../components/SbolIconArrowInDown";
import SbolIconArrowUpRight from "../components/SbolIconArrowUpRight";
import CloseIcon from "@/components/SbolIconX"

export default {
  props: ["header"],
  data() {
    return {
      description : false
    };
  },
  methods: {
    toogleDescription() {
      this.description = !this.description;
    }
  },
  components: {
    SbolIconArrowUpRight,
    SbolIconArrowInDown,
    SbolLink,
    SbolIconInfo,
    CloseIcon
  },
  filters: {
    truncate: function (text, length, suffix) {
      if(text.length > length){
        return text.substring(0, length) + suffix;
      }else{
        return text
      }
    },
  }
};
</script>

<style scoped>

header {
  overflow: hidden;
  height: 110px;
  margin: 0 0 5px 0;
  padding:10px;
  border: 1px solid #fff;
}

header h2,h1{
  margin: 0px
}
h1,.h1 {
  font-size: 24px
}
h1.long{
  font-size: 20px;
}
header *,
a,
a:hover {
  color: #fff;
  text-decoration: none;
}

.mutableDescription{
  display: none;
  height: 100px;
  overflow-y: auto;
}


.mutableDescription a{font-size:2em;float: right}
.mutableDescription div{padding-top: 2em}

.showMutable .mutableDescription{
  display: block;
}
.showMutable .headerDetails{
  display: none;
}

ul {
  padding: 5px;
  margin: 0px;
}

ul li {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid #f0f2f5;
}
ul li:nth-last-child(1) {
  border-bottom: none !important;
}
ul li span {
  text-align: right;
  font-weight: 400;
}


</style>
