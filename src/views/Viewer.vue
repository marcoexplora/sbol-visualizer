<template>
  <div id="SbolVisualizer">
    <div v-if="empty === true" class="empty">
      <a href="https://sbolstandard.org/">
        <sbol-logo />
        <small>https://sbolstandard.org/</small>
      </a>
    </div>
    <div v-if="!empty" class="SBOLwidget">
      <nav>
        <Header :header="header" />
        <list-annotations :annotations="annotations" @selectedAnnotation="showDetail" />
      </nav>
      <div class="main" ref="chartsContainer">
        <chart
          :annotations="annotations"
          :annotation="annotation"
          @selectedAnnotation="showDetail"
          :mainWidth="chartsWidth"
        />

        <detail :annotation="annotation" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import Header from "../components/Header";
import ListAnnotations from "../components/ListAnnotations";
import Chart from "../components/Chart";
import Detail from "../components/Detail";

import SbolLogo from "../components/SbolLogo";

export default {
  props: ["source"],
  data() {
    return {
      header: {},
      annotations: [],
      annotation: null,
      filter: "",
      empty: true,
      chartsWidth: 0
    };
  },
  methods: {
    showDetail: function(data) {
      window.console.log("showDetail from viewer", data);
      this.annotation = this.annotations[data];
    },
    matchWidth() {
      const main = this.$refs.test;
      this.mainWidth = main.clientWidth + "px";
    }
  },
  components: {
    Chart,
    Detail,
    ListAnnotations,
    Header,
    SbolLogo
  },
  mounted: function() {
    axios.get(this.source).then(ret => {
      this.header = {
        partID: ret.data.friendly_id,
        name: ret.data.name,
        alternativeName: "",
        version: "",
        division: "",
        parentSequence: ""
      };
      this.annotations = ret.data.annotations;
      this.annotations.map(a => {
        if (a.direction) {
          a.direction = a.direction === 1 ? "FW" : "RV";
        } else {
          a.direction = "--";
        }
      });
      this.empty = false;

      this.$nextTick(function() {
        this.chartsWidth = this.$refs.chartsContainer.clientWidth - 50;
      });
    });
  }
};
</script>

<style scoped>
#SbolVisualizer {
  font-family: Helvetica;
  overflow: scroll;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #202832;
  text-align: left;
  margin: 0;
  padding: 0;
}

.empty {
  background-color: #f0f2f5;
  border: 1px solid #aaa;
  border-radius: 3px;
  padding: 5px;
  text-align: center;
  overflow: hidden;
}
.SBOLwidget {
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, auto));
  grid-template-rows: auto 1fr;
  height: calc(100vh - 7vh);
}

nav {
  height: calc(100vh - 13vh);
  overflow-y: scroll;
  padding: 0 12px 0 0;
}
</style>

