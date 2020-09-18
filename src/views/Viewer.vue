<template>
  <div @dragover="dragover" @dragleave="dragleave" @drop="drop">
    <div>
      <input
        type="file"
        multiple
        name="fields[assetsFieldHandle][]"
        id="assetsFieldHandle"
        @change="onChange"
        ref="file"
        accept=".json, .xml"
      />
    </div>

    <div v-if="empty === true" class="sbolMain empty" ref="sbolVisualizer">
      <a href="https://sbolstandard.org/">
        <sbol-logo />
        <small>https://sbolstandard.org/</small>
      </a>
    </div>
    <div v-else ref="sbolVisualizer" :key="flavourClass">
      <div v-bind:class="[flavourClass]">
        <nav v-if="!flavourMini">
          <sbol-header :header="sbolDataLayer.header" />
          <sbol-list-annotations
            :annotations="sbolDataLayer.annotations"
            @selectedAnnotation="showDetail"
          />
        </nav>
        <div class="main" ref="chartsContainer">
          <sbol-chart
            :annotations="sbolDataLayer.annotations"
            :annotation="annotation"
            @selectedAnnotation="showDetail"
            :mainWidth="chartsWidth"
          />
          <sbol-detail v-if="!flavourMini" :annotation="annotation" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import SbolHeader from "../components/SbolHeader";
import SbolListAnnotations from "../components/SbolListAnnotations";
import SbolChart from "../components/SbolChart";
import SbolDetail from "../components/SbolDetail";
import SbolLogo from "../components/SbolLogo";

import jsonHandler from "@/lib/importer/jsonHandler";
import xmlHandler from "@/lib/importer/xmlHandler";

export default {
  props: ["source", "format", "data", "flavour"],

  data() {
    return {
      sbolDataLayer: {
        header: {},
        annotations: [],
      },
      fileObj: {},
      droppedFile: { type: "", data: "" },
      annotation: null,
      filter: "",
      empty: true,
      chartsWidth: 0,
      flavourClass: "SBOLcontainer XL",
      flavourMini: false,
    };
  },
  methods: {
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;

      this.onChange();

      console.log("drop");
    },
    dragleave(event) {
      console.log("dragleave" + event);
    },
    dragover(event) {
      event.preventDefault();
      console.log("dragover");
    },
    onChange() {
      this.fileObj = [...this.$refs.file.files][0];

      const read = new FileReader();
      read.readAsText(this.fileObj);

      read.onload = (function (theFile, _that) {
        return function (el) {
          _that.droppedFile.name = theFile.name;
          _that.droppedFile.type = theFile.type;

          _that.droppedFile.data = el.target.result;

          const dataFormat =
            _that.droppedFile["type"] == "text/xml" ? "xml" : "json";
          _that.genericLoad(dataFormat, _that.droppedFile["data"]);
        };
      })(this.fileObj, this);
    },
    remove(i) {
      this.filelist.splice(i, 1);
    },
    showDetail: function (idx) {
      this.annotation = this.sbolDataLayer.annotations[idx];
    },
    matchWidth: function () {
      const main = this.$refs;
      this.mainWidth = main.clientWidth + "px";
      console.log(`this.mainWidth  ${this.mainWidth}`);
    },
    genericLoad: function (dataFormat, data) {
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
    loadJson: function (json) {
      this.sbolDataLayer = jsonHandler.convertJson(json);

      this.empty = false;
      this.$nextTick(function () {
        this.chartsWidth = this.$refs.chartsContainer.clientWidth - 50;
      });
    },
    loadXml: function (xml) {
      this.sbolDataLayer = xmlHandler.convertXml(xml);
      this.empty = false;
    },
    resizeHandler: function () {
      const defaultBreakpoints = [
        {
          class: "SM",
          width: 384,
        },
        {
          class: "MD",
          width: 576,
        },
        {
          class: "LG",
          width: 768,
        },
        {
          class: "XL",
          width: 960,
        },
      ];
      const widthContainer =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      let classBp = "XL";
      defaultBreakpoints.forEach((bp) => {
        classBp = bp.width <= widthContainer ? bp.class : classBp;
      });

      if (["XL", "LG"].indexOf(classBp) == -1) {
        this.flavourMini = true;
      }

      this.flavourClass = `${
        this.flavourMini ? "mini" : "SBOLcontainer"
      } ${classBp}`;
    },
  },
  components: {
    SbolChart,
    SbolDetail,
    SbolListAnnotations,
    SbolHeader,
    SbolLogo,
  },
  created: function () {
    this.resizeHandler();
  },
  mounted: function () {
    if (this.format) {
      // Inline data
      const dataFormat = this.format == "json" ? "json" : "xml";
      this.genericLoad(dataFormat, this.data);
    } else if (this.source) {
      // Load a file
      const dataFormat = this.source.indexOf(".json") != -1 ? "json" : "xml";
      axios.get(this.source).then((data) => {
        this.genericLoad(dataFormat, data.data);
      });
    }

    if (this.flavour == "mini") {
      this.flavourMini = true;
    }
    window.addEventListener("resize", this.resizeHandler);
  },
  destroyed: function () {
    window.removeEventListener("resize", this.resizeHandler);
  },
};
</script>

<style scoped>
.sbolMain {
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

.bg-green-300 {
  background-color: #1c1b41;
}
.bg-gray-100 {
  background-color: #072008;
}

.hide {
  display: none;
}
.empty {
  background-color: #f0f2f5;
  border-radius: 3px;
  padding: 20px;
  text-align: center;
  overflow: hidden;
}
.SBOLcontainer {
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, auto));
  grid-template-rows: auto 1fr;
  height: calc(100vh - 7vh);
}

nav {
  height: calc(100vh - 13vh);
  overflow-y: scroll;
  padding: 0 12px 0 0;
}
</style>

