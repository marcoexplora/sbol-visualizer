<template>
  <div>
    <div v-if="empty === true" class="sbolMain empty" ref="sbolVisualizer">
      <a href="https://sbolstandard.org/">
        <sbol-logo />
        <small>https://sbolstandard.org/</small>
      </a>
    </div>
    <div v-else ref="sbolVisualizer">
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

import xmlHandler from "@/lib/xml/xmlHandler";

export default {
  props: ["source", "format", "data", "flavour"],
  data() {
    return {
      sbolDataLayer: {},
      annotation: null,
      filter: "",
      empty: true,
      chartsWidth: 0,
      flavourClass: "SBOLcontainer",
      flavourMini: false,
    };
  },
  methods: {
    showDetail: function (idx) {
      this.annotation = this.sbolDataLayer.annotations[idx];
    },
    matchWidth: function () {
      const main = this.$refs;
      this.mainWidth = main.clientWidth + "px";
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
      const jsonName = json.name || "";
      const jsonFrindlyID = json.friendly_id || "";

      this.sbolDataLayer.header = {
        partID: jsonFrindlyID,
        name: jsonName,
        alternativeName: "",
        version: "",
        division: "",
        parentSequence: "",
      };
      this.sbolDataLayer.annotations = json.annotations || [];
      this.sbolDataLayer.annotations.map((a) => {
        if (a.direction) {
          a.direction = a.direction === 1 ? "FW" : "RV";
        } else {
          a.direction = "--";
        }
      });
      this.empty = false;
      this.$nextTick(function () {
        this.chartsWidth = this.$refs.chartsContainer.clientWidth - 50;
      });
    },
    loadXml: function (xml) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml.toLowerCase(), "text/xml");

      this.sbolDataLayer.header = {
        partID: xmlHandler.xmlFind(xmlDoc, "sbol:displayId"),
        name: xmlHandler.xmlFind(xmlDoc, "name"),
        alternativeName: xmlHandler.xmlFind(xmlDoc, "description"),
        version: "",
        division: "",
        parentSequence: "",
      };
      this.sbolDataLayer.annotations = [];

      const dnaComponents = xmlDoc.getElementsByTagName(
        "sbol:componentdefinition"
      );
      const annotations = [];
      const displayids = xmlHandler
        .xmlFindAll(xmlDoc, "sbol:displayid")
        .filter((id) => {
          return /([id]+[\d]+_+[\d]+)/g.test(id);
        });

      for (let i = 0; i < dnaComponents.length; i++) {
        const component = dnaComponents[i];
        const role = xmlHandler.xmlFind(component, "sbol:role", "rdf:resource");
        const sbolIndex = xmlHandler.xmlFind(component, "sbol:displayid");
        const displayIdposition = displayids.filter((id) => {
          return id.startsWith(`${sbolIndex}_`);
        });
        const index = displayIdposition.toString().replace(`${sbolIndex}_`, "");

        // console.log(`
        // i : ${i},
        // role : ${role}
        // sbolIndex : ${sbolIndex}
        // displayIdposition : ${displayIdposition}
        // index : ${index}
        // `);

        const dataLayerSingleComponent = {
          SBOL: xmlHandler.extractSO(role),
          direction: "--",
          start: 0,
          end: 0,
          index: xmlHandler.extractIndexVal(sbolIndex),
          name: xmlHandler.xmlFind(component, "sbol:displayid"),
          notes: "",
          pk: index,
          role_id: 0,
        };
        annotations[i] = dataLayerSingleComponent;
      }
      // Sorting by pk values
      this.sbolDataLayer.annotations = annotations
        .sort((a, b) => {
          return (
            xmlHandler.extractIndexVal(a.pk) - xmlHandler.extractIndexVal(b.pk)
          );
        })
        .filter((item) => {
          return item.name != "id1"; //todo: discuss with bioteam
        });
      console.log(this.sbolDataLayer.annotations);
      this.empty = false;
    },
  },
  components: {
    SbolChart,
    SbolDetail,
    SbolListAnnotations,
    SbolHeader,
    SbolLogo,
  },
  mounted: function () {
    if (this.flavour == "mini") {
      this.flavourClass = "mini";
      this.flavourMini = true;
    }
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

