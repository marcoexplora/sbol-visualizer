<template>
  <div @dragover="dragover" @dragleave="dragleave" @drop="drop" class="SbolWvWrap" ref="wrapper">
    <div v-if="enabledropfile" style="padding:0;height: 1.2em">
      <div style="width: 100%">

        <div style="float:right;font-size:1.2em">
          <a v-if="enabledropfile && empty === false" style="font-size: 1em;cursor:pointer;" v-on:click="reset()">
            <close-icon/>
          </a>
        </div>

        <label class="txt pointer whiteBg" for="assetsFieldHandle">
          <sbol-box-arrow-up/>
          Choose a file to view</label>
        <input
            type="file"
            multiple
            name="fields[assetsFieldHandle][]"
            id="assetsFieldHandle"
            @change="onChange"
            ref="file"
            accept=".json, .xml"
            style="display: none"
        />
      </div>
    </div>
    <div v-if="errors">
      <div class="panel">
        <a v-if="enabledropfile" v-on:click="reset()">
          <close-icon/>
        </a>
      </div>
      <sbol-errors class="sbolMain empty"></sbol-errors>
    </div>
    <sbol-landing v-else-if="empty === true"></sbol-landing>
    <div v-else ref="sbolVisualizer" :key="flavourClass">
      <div v-bind:class="[flavourClass]">
        <nav
            v-if="!flavourMini"
            ref="navContainer">
          <sbol-header :header="sbolDataLayer.header" :json="sbolDataLayer.json"/>
          <sbol-list-annotations
              :root="sbolDataLayer.header"
              :annotations="sbolDataLayer.annotations"
              :selected="selected"
              :breadcrumbs="visible.breadcrumbs"
              :tags="tags"
              :wcid="id"
              :visible="sbolDataLayer.visibleAnnotations"
              @showBranch="showComponents">
          </sbol-list-annotations>
        </nav>
        <div class="main smooth" ref="chartsContainer">
          <sbol-chart
              :annotations="sbolDataLayer.visibleAnnotations"
              :breadcrumbs="visible.breadcrumbs"
              :selected="selected"
              :graphwidth="chartsWidth"
              :wcid="id"
              :flavourMini="flavourMini"
          />
          <sbol-detail v-if="!flavourMini" :annotation="selected" :sequence="this.sbolDataLayer.sequence" v-bind:tags="this.tags"/>
          <sbol-sequence v-if="!flavourMini" :sequence="this.sbolDataLayer.sequence"  :selected="selected" ></sbol-sequence>
        </div>

      </div>
      <Sbol-footer/>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import eventBus from "@/lib/eventBus";

import SbolLanding from "@/components/SbolLanding";
import SbolErrors from "@/components/SbolErrors";
import SbolHeader from "@/components/SbolHeader";
import SbolListAnnotations from "@/components/SbolListAnnotations";
import SbolChart from "@/components/SbolChart";
import SbolDetail from "@/components/SbolDetail";
import SbolFooter from "@/components/SbolFooter";
import SbolSequence from "@/components/SbolSequence";

import CloseIcon from "@/components/icons/SbolIconX"

import jsonHandler from "@/lib/importer/jsonHandler";
import xmlHandler from "@/lib/importer/xmlHandler";
import SbolBoxArrowUp from "@/components/SbolBoxArrowUp";

export default {
  props: {
    source: {type: String},
    format: {type: String},
    data: {type: String},
    flavour: {type: String},
    dropafile: {type: String}
  },
  data() {
    return {
      id: 0,
      sbolDataLayer: {
        header: {},
        annotations: [],
        sequence : "",
      },
      visible: {
        breadcrumbs: []
      },
      selected: {style: 'initial'},
      tags: [],
      errors: false,
      empty: true,

      chartsWidth: 0,
      updateRender: 0,
      flavourClass: "SBOLcontainer XL",
      flavourMini: false,

      enabledropfile: false,
      fileObj: {},
      droppedFile: {type: "", data: ""},
    };
  },
  methods: {
    reset() {
      this.sbolDataLayer = {
        header: {},
        annotations: [],
      }
      this.empty = true;
      this.errors = false;
      this.search = "";
      this.$refs['file'].value = ''

    },
    drop(event) {
      if (this.enabledropfile) {
        event.preventDefault();
        this.$refs.file.files = event.dataTransfer.files;

        this.onChange();
      }
    },
    // eslint-disable-next-line no-unused-vars
    dragleave(event) {
      // keep this for future reference
    },
    dragover(event) {
      event.preventDefault();
    },
    onChange() {
      this.fileObj = [...this.$refs.file.files][0];

      const read = new FileReader();
      if (this.fileObj != null && this.fileObj.size > 0) {
        read.readAsText(this.fileObj);

        read.onload = (function (theFile, _that) {
          return function (el) {
            _that.droppedFile.name = theFile.name;
            _that.droppedFile.type = theFile.type;

            _that.droppedFile.data = el.target.result;

            const dataFormat =
                _that.droppedFile["type"] === "text/xml" ? "xml" : "json";
            _that.genericLoad(dataFormat, _that.droppedFile["data"]);
          };
        })(this.fileObj, this);
      }
    },
    showDetail: function (annotation) {
      this.tags.push({
        tag: "showDetails",
        element: annotation
      });
      this.selected = annotation;
    },
    showComponents: function (Annotations) {
      this.visibleAnnotations = Annotations;
    },
    matchWidth: function () {
      const main = this.$refs;
      this.mainWidth = main.clientWidth + "px";
    },
    genericLoad: function (dataFormat, data) {
      try {
        if (dataFormat === "json") {
          if (typeof data == "string") {
            data = JSON.parse(data);
          }
          this.loadJson(data);
        }
        if (dataFormat === "xml") {
          this.loadXml(data);
        }

      } catch (error) {

        this.errors = true;
      }

    },
    loadJson: function (json) {
      this.sbolDataLayer = jsonHandler.convertJson(json);
      this.sbolDataLayer.visibleAnnotations = this.sbolDataLayer.annotations;
      this.empty = false;
      this.resizeHandler();
    },
    loadXml: function (xml) {

      xmlHandler.convertXml(xml).then((sb) => {

        this.sbolDataLayer = sb;
        this.sbolDataLayer.visibleAnnotations = this.sbolDataLayer.annotations;

        this.visible.breadcrumbs[0] = {
          name: this.sbolDataLayer.header.partID,
          propriety: {components: this.sbolDataLayer.annotations},
          mutableDescription: this.sbolDataLayer.header.mutableDescription,
        }

        this.empty = false;
        this.resizeHandler();
      }, (sb) => {
        this.errors = true;
      });
    },
    resizeHandler: function () {
      if (typeof this.$refs.wrapper !== 'undefined') {
        const defaultBreakpoints = [
          {
            class: "SM",
            width: 1,
          },
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
        const widthContainer = this.$refs.wrapper.offsetWidth

        let classBp = "XL";
        defaultBreakpoints.forEach((bp) => {
          classBp = bp.width <= widthContainer ? bp.class : classBp;
        });

        this.flavourMini = ["XL", "LG"].indexOf(classBp) === -1;

        this.flavourClass = `${
            this.flavourMini ? "mini" : "SBOLcontainer"
        } ${classBp}`;

        if (!this.empty) {
          this.chartsWidth = null;

          this.$nextTick(function () {
            if (typeof this.$refs.navContainer !== 'undefined') {
              const navWidth = this.$refs.navContainer.clientWidth
              this.chartsWidth = widthContainer - navWidth //- 3; //17 padding and border of chart + NAV 2 + 15
              this.$refs.chartsContainer.style.width = `{this.chartsWidth}px`
            }
          });
        }
        this.updateRender += 1;
      }
    },
    cleanTag: function (_annotations) {
      this.Search({"name": "root", "propriety": {"components": [..._annotations]}}, () => true, "", [])
    },
    Search: function (annotations, filter, tag, route) {
      let _route = [annotations, ...route];

      if (filter(annotations)) {
        route.forEach((el) => {
          el.propriety.tag = tag;
        });
        annotations.propriety.tag = tag;
      }

      if (annotations.hasOwnProperty('propriety')) {
        if (annotations.propriety.hasOwnProperty('components')) {
          annotations.propriety.components.forEach((elem) => {
            this.Search(elem, filter, tag, _route);
          });
        }
      }
    },

  },
  components: {
    SbolSequence,
    SbolBoxArrowUp,
    SbolChart,
    SbolDetail,
    SbolListAnnotations,
    SbolHeader,
    SbolErrors,
    SbolFooter,
    SbolLanding,
    CloseIcon
  },
  created: function () {

    this.resizeHandler();
    this.id = parseInt(Math.random() * 100000);

    eventBus.$on("set-visible", (_event) => {
      if (_event.wcid === this.id) {
        this.sbolDataLayer.visibleAnnotations = _event.annotations.length === 1 ? _event.annotations[0] : _event.annotations;
      }
    });

    eventBus.$on("search", (_event) => {
      if (_event.wcid === this.id) {
        this.cleanTag(this.sbolDataLayer.annotations);

        if (/^\d+$/.test(_event.searchString)) {
          const pos = parseInt(_event.searchString);
          this.Search({"name": "root", "propriety": {"components": [...this.sbolDataLayer.annotations]}}
              , (el) => {
                return !!(pos >= el.propriety.start && el.propriety.end >= pos)
              },
              _event.searchString,
              []);
        } else {
          this.Search({"name": "root", "propriety": {"components": [...this.sbolDataLayer.annotations]}}
              , (el) => {
                return el.name.indexOf(_event.searchString) !== -1
              },
              _event.searchString, []);
        }

      }
    });

    eventBus.$on("select-annotation", (_event) => {
      if (_event.wcid === this.id) {
        const _annotation = _event.annotation;
        if (_event.annotation.style === "root") {
          _annotation.name = this.sbolDataLayer.header.name;
          _annotation.partID = this.sbolDataLayer.header.partID;
          _annotation.persistentIdentity = this.sbolDataLayer.header.persistentIdentity;
        }

        this.selected = _annotation;

      }
    });

    eventBus.$on("update-breackcrumbs", (_event) => {

      if (_event.wcid === this.id) {
        const _level = parseInt(_event.level) + 1;
        this.visible.breadcrumbs[0] = {
          name: this.sbolDataLayer.header.partID,
          propriety: {components: this.sbolDataLayer.annotations},
          mutableDescription: this.sbolDataLayer.header.mutableDescription,
        }

        this.visible.breadcrumbs[_level] = _event.item;

        function cleanFromLevel(_breadcrumb, _level) {
          const results = []
          for (let t = 0; t < _level; t++) {
            results.push(_breadcrumb[t])
          }
          return results
        }

        if (_event.item == null) {
          this.visible.breadcrumbs = cleanFromLevel(this.visible.breadcrumbs, _level);
        } else {
          this.visible.breadcrumbs = cleanFromLevel(this.visible.breadcrumbs, _level + 1);
        }

        const lastElement = this.visible.breadcrumbs[this.visible.breadcrumbs.length - 1]
        this.sbolDataLayer.visibleAnnotations = lastElement.propriety.components;

      }
    });

    eventBus.$on("mobile-expanse", (_event) => {
      if (_event.wcid === this.id) {
        const _level = this.visible.breadcrumbs.length -1;
        eventBus.$emit("update-breackcrumbs", { item : _event.item, level : _level , wcid : _event.wcid});
      }
    });

    eventBus.$on("mobile-collapse", (_event) => {

      if (_event.wcid === this.id) {
        const _level = this.visible.breadcrumbs.length -1;
        eventBus.$emit("select-annotation", { annotation : this.visible.breadcrumbs[_level - 1 ].propriety.components, wcid : _event.wcid});
        eventBus.$emit("update-breackcrumbs", { item :this.visible.breadcrumbs[_level - 1 ], level : _level , wcid : _event.wcid});
      }

    });
  },
  mounted: function () {
    if (typeof this.dropafile != 'undefined') {
      this.enabledropfile = true;
    }

    if (this.format) {
      // Inline data
      const dataFormat = this.format === "json" ? "json" : "xml";
      this.genericLoad(dataFormat, this.data);
    } else if (this.source) {
      // Load a file
      const dataFormat = this.source.indexOf(".json") !== -1 ? "json" : "xml";
      axios.get(this.source).then((data) => {
        this.genericLoad(dataFormat, data.data);
        this.sbolDataLayer.header['source_link'] = this.source;
      });
    }

    if (this.flavour === "mini") {
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
  overflow: scroll;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #202832;
  text-align: left;
  margin: 0;
  padding: 10px;
}

.panel {
  position: absolute;
  right: 1em;
  font-size: 2em;
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
  grid-template-columns: 1fr 2fr;
  height: 675px;
}

nav {
  padding: 0 5px 0 0;
  min-width: 300px;
}

</style>

<style>


  header *, section *, footer *, .detailAnnotation *, .txt {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .blue-container {
    border-radius: 5px;
    background-color: #0078b6;
  }

  .text-muted-white {
    color: #e0e9f3;
    font-weight: 500;
  }

  h1, .h1 {
    font-size: 24px
  }

  h2, .h2, .small {
    font-size: 14px;
  }

  a.white,
  a.white:hover {
    color: #fff;
    text-decoration: none;
  }

  .va-super {
    vertical-align: super;
  }

  .p1, .p-1 {
    padding: 5px
  }

  .py1 {
    padding: 0 5px;
  }

  .bold {
    font-weight: bold;
  }

  .float-left {
    float: left
  }

  .float-right {
    float: right;
  }

  .smooth {
    transition: 200ms;
  }

  .pointer {
    cursor: pointer;
  }
  .whiteBg{
    padding: 5px 15px 0 5px;
    height: 1.55em;
    background: #FFF;
    border-radius: 4px 4px 0 0;
  }
</style>