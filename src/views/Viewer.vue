  <template>
    <div @dragover="dragover" @dragleave="dragleave" @drop="drop" class="SbolWvWrap">
      <div v-if="enabledropfile" style="padding:0;height: 1.55em">
        <div style="width: 100%">
          <a @click="BFthree(sbolDataLayer.annotations)">debug</a>
          <div style="float:right;font-size:1.2em">
            <a  v-if="enabledropfile && empty === false"  style="font-size: 1em" v-on:click="reset()"><close-icon/></a>
          </div>

          <label style="cursor:pointer" class="txt" for="assetsFieldHandle"><sbol-box-arrow-up/> Choose a file to view</label>
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
          <a  v-if="enabledropfile" v-on:click="reset()"><close-icon/></a>
        </div>
        <sbol-errors  class="sbolMain empty"></sbol-errors>
      </div>
      <sbol-landing v-else-if="empty === true"></sbol-landing>

      <div v-else ref="sbolVisualizer" :key="flavourClass">
        <div v-bind:class="[flavourClass]">
          <nav
              v-if="!flavourMini"
              ref="navContainer">
            <sbol-header :header="sbolDataLayer.header" />
            <sbol-list-annotations
                :root="sbolDataLayer.header"
                :annotations="sbolDataLayer.annotations"
                :selected="selected"
                :breadcrumbs="visible.breadcrumbs"
                :tags="tags"
                :wcid="id"
                :visible="sbolDataLayer.visibleAnnotations"
                :key="updateRender"
                @showBranch="showComponents"></sbol-list-annotations>
          </nav>
          <div class="main smooth" ref="chartsContainer">
            <sbol-chart
                :annotations="sbolDataLayer.visibleAnnotations"
                :breadcrumbs="visible.breadcrumbs"
                :selected="selected"
                :key="updateRender"
                :graphwidth="chartsWidth"
                :wcid="id"
            />
            <sbol-detail v-if="!flavourMini" :annotation="selected"  v-bind:tags="this.tags"/>
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

  import SbolLogo from "@/components/SbolLogo";
  import CloseIcon from "@/components/SbolIconX"

  import jsonHandler from "@/lib/importer/jsonHandler";
  import xmlHandler from "@/lib/importer/xmlHandler";
  import SbolBoxArrowUp from "@/components/SbolBoxArrowUp";

  export default {
    props: ["source", "format", "data", "flavour","dropafile"],

    data() {
      return {
        id : 0,
        sbolDataLayer: {
          header: {
          },
          annotations: [],
        },
        visible : {
          breadcrumbs : []
        },
        selected: null,
        tags: [],
        filter: "",
        errors: false,
        empty: true,

        chartsWidth: 0,
        updateRender: 0,
        flavourClass: "SBOLcontainer XL",
        flavourMini: false,

        enabledropfile: false,
        fileObj: {},
        droppedFile: { type: "", data: "" },
      };
    },
    methods: {
      reset(){
        this.sbolDataLayer =  {
          header: {
          },
          annotations: [],
        }
        this.empty = true;
        this.errors = false;
        this.filter = "";
        this.$refs['file'].value = ''

      },
      drop(event) {
        if(this.enabledropfile){
          event.preventDefault();
          this.$refs.file.files = event.dataTransfer.files;

          this.onChange();
        }
      },
      dragleave(event) {
        // keep this for future reference
      },
      dragover(event) {
        event.preventDefault();
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
                _that.droppedFile["type"] === "text/xml" ? "xml" : "json";
            _that.genericLoad(dataFormat, _that.droppedFile["data"]);
          };
        })(this.fileObj, this);
      },
      showDetail: function (annotation) {
        this.tags.push({
          tag : "showDetails",
          element : annotation
        });
        this.selected = annotation;
      },
      showComponents: function(Annotations){
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
          //todo: remove before production
          //this.sbolDataLayer.__anns = this.sbolDataLayer.annotations;
          window.sbolDataLayer = this.sbolDataLayer

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
        xmlHandler.convertXml(xml).then((sb)=>{
          this.sbolDataLayer = sb;
          this.sbolDataLayer.visibleAnnotations = this.sbolDataLayer.annotations;
          this.empty = false;
          this.resizeHandler();
        })
      },
      resizeHandler: function () {
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
        const widthContainer =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        let classBp = "XL";
        defaultBreakpoints.forEach((bp) => {
          classBp = bp.width <= widthContainer ? bp.class : classBp;
        });

        this.flavourMini = ["XL", "LG"].indexOf(classBp) === -1;

        this.flavourClass = `${
            this.flavourMini ? "mini" : "SBOLcontainer"
        } ${classBp}`;

        if(!this.empty ){
          this.chartsWidth = null;

          this.$nextTick(function () {
            if(typeof this.$refs.navContainer !== 'undefined'){
              const navWidth =  this.$refs.navContainer.clientWidth
              this.chartsWidth = widthContainer - navWidth -69; //34 padding and border of chart + NAV 5 + 20
              this.$refs.chartsContainer.style.width = `{this.chartsWidth}px`
            }
          });
        }
        this.updateRender += 1;
      },
      BFthree: function (annotations) {
        console.log('BFthree')
        console.log(annotations);

        function recursiveWalk(components,question){
          console.log('recursiveWalk');

          components.forEach( (comp) => {
                console.log(comp.name);
                  recursiveWalk(comp.propriety.components,question)
              }
          )
        }

        console.log(1)
        if(annotations.hasOwnProperty('components')){
          console.log(2)
          console.log(`comp ${annotations.name} has  child components`)
         recursiveWalk(annotations.components,question)
        }else{
          console.log(3)
          console.log(`comp ${annotations.name} has not child components`)
        }

      }
    },
    components: {
      SbolBoxArrowUp,
      SbolChart,
      SbolDetail,
      SbolListAnnotations,
      SbolHeader,
      SbolLogo,
      SbolErrors,
      SbolFooter,
      SbolLanding,
      CloseIcon
    },
    created: function () {
      this.resizeHandler();
      this.id = parseInt(Math.random() * 100000);

      eventBus.$on("set-visible", (_event) => {

        if(_event.wcid == this.id) {
          this.sbolDataLayer.visibleAnnotations = _event.annotations.length === 1 ? _event.annotations[0] : _event.annotations;
          this.updateRender += 1;
        }
      });

      eventBus.$on("select-annotation", (_event) => {

        if(_event.wcid == this.id) {
          this.selected = _event.annotation;
          this.updateRender += 1;
        }
      });


      eventBus.$on("update-breackcrumbs", (_event) => {

        if(_event.wcid == this.id) {
          /* first element is always the  root */
          const _level =  parseInt(_event.level) + 1;
          this.visible.breadcrumbs[0]  = { name : this.sbolDataLayer.header.partID, propriety : { components : this.sbolDataLayer.annotations }}

          if( this.visible.breadcrumbs[_level] !== _event.item){
              this.visible.breadcrumbs[_level] = _event.item;

              function cleanFromLevel(_bradcrumbs,_level){
                const results = []
                for(let t = 0; t < _level; t++){
                  results.push(_bradcrumbs[t])
                }
                return results
              }

            if(_event.item == null){
              this.visible.breadcrumbs = cleanFromLevel(this.visible.breadcrumbs,_level);
            }

            const lastElement = this.visible.breadcrumbs[this.visible.breadcrumbs.length -1]
            this.sbolDataLayer.visibleAnnotations = lastElement.propriety.components;
            this.updateRender += 1;
          }

        }
      });

    },
    mounted: function () {
      if(typeof this.dropafile != 'undefined'){
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

  <style  scoped>
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
    /* grid-template-rows: auto 1fr;*/
    height: 680px;
  }

  nav {
    padding: 0 5px 0 0;
    min-width: 300px;
  }

  </style>

  <style  lang="scss">


  .SbolWvWrap {
    header *, section *, footer *,.detailAnnotation *,.txt {
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

    /* super */
    .va-super {
      vertical-align: super;
    }

    /* spacing */
    .p1, .p-1 {
      padding: 5px
    }

    .py1 {
      padding: 0 5px;
    }
    .bold{
      font-weight: bold;
    }
    .float-left{
      float: left
    }
    .float-right{
      float: right;
    }
    .smooth{
      transition: 200ms;
    }
  }
  </style>