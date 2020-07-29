<template>
  <div class="SbolVisualizer" ref="sbolVisualizer">
    <div v-if="empty === true" class="empty">
      <a href="https://sbolstandard.org/">
        <sbol-logo />
        <small>https://sbolstandard.org/</small>
      </a>
    </div>
    <div v-if="!empty" class="SBOLwidget">
      <nav>
        <sbol-header :header="header" />
        <sbol-list-annotations :annotations="annotations" @selectedAnnotation="showDetail" />
      </nav>
      <div class="main" ref="chartsContainer">
        <sbol-chart
          :annotations="annotations"
          :annotation="annotation"
          @selectedAnnotation="showDetail"
          :mainWidth="chartsWidth"
        />
        <sbol-detail :annotation="annotation" />
      </div>
    </div>
    <pre class="slot-wrapper hide">
      <slot></slot>
    </pre>
  </div>
</template>

<script>
import axios from "axios";

import SbolHeader from "../components/SbolHeader";
import SbolListAnnotations from "../components/SbolListAnnotations";
import SbolChart from "../components/SbolChart";
import SbolDetail from "../components/SbolDetail";

import SbolLogo from "../components/SbolLogo";

export default {
  props: ["source", "format", "data"],
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
    // is this used somewhere???
    // matchWidth: function() {
    //   const main = this.$refs.test;
    //   this.mainWidth = main.clientWidth + "px";
    // },
    genericLoad: function(dataFormat, data) {
      if (dataFormat == "json") {
        if (typeof data == "string") {
          data = JSON.parse(data);
        }
        this.loadJson(data);
      }
      if (dataFormat == "xml") {
        this.loadXml(data);
      }
    },
    loadJson: function(json) {
      const jsonName = json.name || "";
      const jsonFrindlyID = json.friendly_id || "";

      this.header = {
        partID: jsonFrindlyID,
        name: jsonName,
        alternativeName: "",
        version: "",
        division: "",
        parentSequence: ""
      };
      this.annotations = json.annotations || [];
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
        if (this.chartsWidth < 300) {
          this.$refs.sbolVisualizer.className = "SbolVisualizer Mini";
        }
        // console.log(`this.chartsWidth ${this.chartsWidth}`);
        // console.log(
        //   `this.$refs.sbolVisualizer.clientWidth ${this.$refs.sbolVisualizer.clientWidth}`
        // );
      });
    },
    loadXml: function(xml) {
      console.log(xml);
    }
  },
  components: {
    SbolChart,
    SbolDetail,
    SbolListAnnotations,
    SbolHeader,
    SbolLogo
  },
  mounted: function() {
    if (this.format) {
      // Inline data
      const dataFormat = this.format == "json" ? "json" : "xml";
      this.genericLoad(dataFormat, this.data);
    } else if (this.source) {
      // Load a file
      const dataFormat = this.source.indexOf(".json") != -1 ? "json" : "xml";
      axios.get(this.source).then(data => {
        this.genericLoad(dataFormat, data.data);
      });
    }
  }
};
</script>

<style scoped>
.SbolVisualizer {
  font-family: Helvetica;
  overflow: scroll;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #202832;
  text-align: left;
  margin: 0;
  padding: 10px;
}
.hide {
  display: none;
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

