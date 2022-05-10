<template>

          <a class="va-super py1 exportFormatWrap" v-if="canIexport()" v-on:click="convert()">
            <sbol-icon-download/>
            <ul class='exportFormat' v-if="toogleDrop">
             <li v-for="exp in exported" :key="exp.title">
               <a :href='exp.href' :download='exp.download'>{{ exp.title }}</a>
              </li>
            </ul>
          </a>

</template>

<script>
import {jsonToFasta,jsonToGenbank} from "bio-parsers"

import SbolIconDownload from "@/components/icons/SbolIconDownload";

export default {
  props: {
    json: {type: Object},
  },
  data() {
    return {
      exported: [],
      toogleDrop: false,
    };
  },
  methods: {
    convert() {
      if (this.exported.length == 0) {
        this.exported = [];

        const fasta = jsonToFasta(this.json);

        this.exported.push({
          title: 'Fasta',
          href: 'data:text/plain;charset=utf-8,' + encodeURIComponent(fasta),
          download: `${encodeURIComponent(this.json.partID.trim())}.fasta`
        })



        const genbank = jsonToGenbank(this.json);

        this.exported.push({
          title: 'GanBank',
          href: 'data:text/plain;charset=utf-8,' + encodeURIComponent(genbank),
          download: `${encodeURIComponent(this.json.partID.trim())}.gb`
        })
      }
      this.toogleDrop = !this.toogleDrop
    },
    canIexport() {
      return typeof this.json.sequence !== 'undefined' && this.json.sequence != ''
    },
  },
  components: {
    SbolIconDownload,
  },
  filters: {
    truncate: function (text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text
      }
    },
  }
};
</script>

<style scoped>

ul {
  list-style: none;
}

li a {
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  color: #CCCCCC;
}

ul li span {
  text-align: right;
  font-weight: 400;
}

.exportFormatWrap {
  position: relative;
}

.exportFormat {
  position: absolute;
  top: 0;
  padding: 0px 10px;
  border: 2px solid #CCCCCC;
  left: -1em;
}

</style>
