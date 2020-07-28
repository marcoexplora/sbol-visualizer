<template>
  <div id="app">
    <h1>Sbol 🔍 develop page</h1>

    <h2>Javascript load</h2>
    <button @click="loadJson">load json file</button>
    <SbolViewer :variable="source" />
  </div>
</template>

<script>
import SbolViewer from "./views/Viewer.vue";

export default {
  name: "app",
  data() {
    return {
      source: null
    };
  },
  methods: {
    loadJson() {
      //window.console.log("hi")
      const jsonFile = {
        pk: 3911,
        friendly_id: "M3GC5GR",
        num_collaborators: null,
        name: "LacZalpha-pUC18-IIs sites up (SEVA# - - 3X)",
        sequence:
          "GAAGCGGAAGAGCGCCCAATACGCAAACCGCCTCTCCCCGCGCGTTGGCCGATTCATTAATGCAGCTGGCACGACAGGTTTCCCGACTGGAAAGCGGGCAGTGAGCGCAACGCAATTAATGTGAGTTAGCTCACTCATTAGGCACCCCAGGCTTTACACTTTATGCTTCCGGCTCGTATGTTGTGTGGAATTGTGAGCGGATAACAATTTCACACAGGAAACAGCTATGACCATGATTACGAATTCGAGCTCGGTACCCGGTCTCAACCCACCTGCGATGACCCGTCTCTACCCGAAGACTTACCCGATATCGCGATTGTCTTCGCGACGAGACGCGACATCGCAGGTGCGACGAGACCAAGGGGATCCTCTAGAGTCGACCTGCAGGCATGCAAGCTTGGCACTGGCCGTCGTTTTACAACGTCGTGACTGGGAAAACCCTGGCGTTACCCAACTTAATCGCCTTGCAGCACATCCCCCTTTCGCCAGCTGGCGTAATAGCGAAGAGGCCCGCACCGATCGCCCTTCCCAACAGTTGCGCAGCCTGAATGGCGAATGGCGCCTGATGCGGTATTTTCTCCTTACGCATCTGTGCGGTATTTCACACCGCATATGATGCACTCTCAGTACAATCTGCTCTGATGCCGCATAGTTAAGCCAGCCCCGACACCCGCCAACACCCGCTGA",
        public: true,
        obsolete: false,
        annotations: [
          {
            pk: 22354,
            start: 195,
            end: 219,
            direction: 1,
            name: "F24 primer bind",
            notes: "",
            role_id: 29,
            SBOL: "SO:0001729"
          }, //primer oligos
          {
            pk: 31032,
            start: 226,
            end: 259,
            direction: 1,
            name: "lacZa*_18_interval_1",
            notes: "",
            role_id: 37,
            SBOL: "SO:0001737"
          }, //Gene
          {
            pk: 31034,
            start: 259,
            end: 306,
            direction: 1,
            name: "MIIs B2 (accc)",
            notes: "",
            role_id: 27,
            SBOL: "SO:0001727"
          }, //Misc.feature/Other/Unknown
          {
            pk: 31036,
            start: 361,
            end: 652,
            direction: 1,
            name: "lacZa*_18_interval_2",
            notes: "",
            role_id: 37,
            SBOL: "SO:0001729"
          }, //Gene
          {
            pk: 31037,
            start: 613,
            end: 616,
            direction: 1,
            name: "Premature STOP",
            notes: "",
            role_id: 14,
            SBOL: "SO:0001737"
          }, //STOP Codon
          {
            pk: 31038,
            start: 422,
            end: 446,
            direction: 2,
            name: "R24 primer bind",
            notes: "",
            role_id: 29,
            SBOL: "SO:0001727"
          }, //primer oligos
          {
            pk: 31039,
            start: 312,
            end: 361,
            direction: 1,
            name: "MIIs C1 (gcga)",
            notes: "Insertion",
            role_id: 27,
            SBOL: "SO:0001729"
          }, //Misc.feature/Other/Unknown

          {
            pk: 223541,
            start: 195,
            end: 219,
            direction: 1,
            name: "F24 primer bind",
            notes: "",
            role_id: 29,
            SBOL: "SO:0001729"
          }, //primer oligos
          {
            pk: 310322,
            start: 226,
            end: 259,
            direction: 1,
            name: "lacZa*_18_interval_1",
            notes: "",
            role_id: 37,
            SBOL: "SO:0001737"
          }, //Gene
          {
            pk: 310343,
            start: 259,
            end: 306,
            direction: 1,
            name: "MIIs B2 (accc)",
            notes: "",
            role_id: 27,
            SBOL: "SO:0001727"
          }, //Misc.feature/Other/Unknown
          {
            pk: 310364,
            start: 361,
            end: 652,
            direction: 1,
            name: "lacZa*_18_interval_2",
            notes: "",
            role_id: 37,
            SBOL: "SO:0001729"
          }, //Gene
          {
            pk: 310375,
            start: 613,
            end: 616,
            direction: 1,
            name: "Premature STOP",
            notes: "",
            role_id: 14,
            SBOL: "SO:0001737"
          }, //STOP Codon
          {
            pk: 310386,
            start: 422,
            end: 446,
            direction: 2,
            name: "R24 primer bind",
            notes: "",
            role_id: 29,
            SBOL: "SO:0001727"
          }, //primer oligos
          {
            pk: 310397,
            start: 312,
            end: 361,
            direction: 1,
            name: "MIIs C1 (gcga)",
            notes: "Insertion",
            role_id: 27,
            SBOL: "SO:0001729"
          }, //Misc.feature/Other/Unknown
          {
            pk: 222354,
            start: 195,
            end: 219,
            direction: 1,
            name: "F24 primer bind",
            notes: "",
            role_id: 29,
            SBOL: "SO:0001729"
          }, //primer oligos
          {
            pk: 331032,
            start: 226,
            end: 259,
            direction: 1,
            name: "lacZa*_18_interval_1",
            notes: "",
            role_id: 37,
            SBOL: "SO:0001737"
          }, //Gene
          {
            pk: 431034,
            start: 259,
            end: 306,
            direction: 1,
            name: "MIIs B2 (accc)",
            notes: "",
            role_id: 27,
            SBOL: "SO:0001727"
          }, //Misc.feature/Other/Unknown
          {
            pk: 431036,
            start: 361,
            end: 652,
            direction: 1,
            name: "lacZa*_18_interval_2",
            notes: "",
            role_id: 37,
            SBOL: "SO:0001729"
          }, //Gene
          {
            pk: 531037,
            start: 613,
            end: 616,
            direction: 1,
            name: "Premature STOP",
            notes: "",
            role_id: 14,
            SBOL: "SO:0001737"
          }, //STOP Codon
          {
            pk: 631038,
            start: 422,
            end: 446,
            direction: 2,
            name: "R24 primer bind",
            notes: "",
            role_id: 29,
            SBOL: "SO:0001727"
          }, //primer oligos
          {
            pk: 731039,
            start: 312,
            end: 361,
            direction: 1,
            name: "MIIs C1 (gcga)",
            notes: "Insertion",
            role_id: 27,
            SBOL: "SO:0001729"
          } //Misc.feature/Other/Unknown
        ]
      };
      this.source = jsonFile;
    }
  },
  components: {
    SbolViewer
  }
};
</script>

<style>
</style>
