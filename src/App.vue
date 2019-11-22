<template>
  <div id="app">    
    <button @click="loadJson"> load json file</button>
    <SbolViewer :source="source" />
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import SbolViewer from './views/Viewer.vue'

export default {
  name: 'app',
  data() {
    return {
      source: null
    }
  },
  methods: {
    loadJson() {
      window.console.log("hi")
          const jsonFile = {"pk":3911,
              "friendly_id": "M3GC5GR",
              "num_collaborators": null,
              "name": "LacZalpha-pUC18-IIs sites up (SEVA# - - 3X)",
              "sequence":"GAAGCGGAAGAGCGCCCAATACGCAAACCGCCTCTCCCCGCGCGTTGGCCGATTCATTAATGCAGCTGGCACGACAGGTTTCCCGACTGGAAAGCGGGCAGTGAGCGCAACGCAATTAATGTGAGTTAGCTCACTCATTAGGCACCCCAGGCTTTACACTTTATGCTTCCGGCTCGTATGTTGTGTGGAATTGTGAGCGGATAACAATTTCACACAGGAAACAGCTATGACCATGATTACGAATTCGAGCTCGGTACCCGGTCTCAACCCACCTGCGATGACCCGTCTCTACCCGAAGACTTACCCGATATCGCGATTGTCTTCGCGACGAGACGCGACATCGCAGGTGCGACGAGACCAAGGGGATCCTCTAGAGTCGACCTGCAGGCATGCAAGCTTGGCACTGGCCGTCGTTTTACAACGTCGTGACTGGGAAAACCCTGGCGTTACCCAACTTAATCGCCTTGCAGCACATCCCCCTTTCGCCAGCTGGCGTAATAGCGAAGAGGCCCGCACCGATCGCCCTTCCCAACAGTTGCGCAGCCTGAATGGCGAATGGCGCCTGATGCGGTATTTTCTCCTTACGCATCTGTGCGGTATTTCACACCGCATATGATGCACTCTCAGTACAATCTGCTCTGATGCCGCATAGTTAAGCCAGCCCCGACACCCGCCAACACCCGCTGA",
              "public": true,
              "obsolete": false,
              "annotations":[
                  {"pk":22354,"start":195,"end":219,"direction":1,"name":"F24 primer bind","notes":"","role_id":29},
                  {"pk":31032,"start":226,"end":259,"direction":1,"name":"lacZa*_18_interval_1","notes":"","role_id":37},
                  {"pk":31034,"start":259,"end":306,"direction":1,"name":"MIIs B2 (accc)","notes":"","role_id":27},
                  {"pk":31036,"start":361,"end":652,"direction":1,"name":"lacZa*_18_interval_2","notes":"","role_id":37},
                  {"pk":31037,"start":613,"end":616,"direction":1,"name":"Premature STOP","notes":"","role_id":14},
                  {"pk":31038,"start":422,"end":446,"direction":2,"name":"R24 primer bind","notes":"","role_id":29},
                  {"pk":31039,"start":312,"end":361,"direction":1,"name":"MIIs C1 (gcga)","notes":"Insertion","role_id":27}
              ]
          }; 
          this.source = jsonFile
      }
  },
  components: {
    //HelloWorld
    SbolViewer
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
