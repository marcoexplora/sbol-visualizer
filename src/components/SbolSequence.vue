<template>
  <div class="sbolSequence" :ref="'sequence'">
    <div class="scrollable" :ref="'seqContainer'">
      <div class="sequence"  v-html="this.showSelection(sequence,this.getStart(),this.getEnd())"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    "sequence": {type: String},
    "selected": {type: Object},
  },
  data() {
    return {}
  },
  methods: {
    getStart() {
      if (typeof this.selected.propriety != 'undefined' &&
          typeof this.selected.propriety.Feature != 'undefined' &&
          this.selected.propriety) {
        return parseInt(this.selected.propriety.Feature.Location.start)
      }
      return 0
    },
    getEnd() {
      if (typeof this.selected.propriety != 'undefined' &&
          typeof this.selected.propriety.Feature != 'undefined' &&
          this.selected.propriety) {
        return parseInt(this.selected.propriety.Feature.Location.end)
      }
      return 0
    },
    showSelection(sequence, start, end) {

      if (typeof sequence === 'undefined' || sequence === ''){
        return `<span class="no_sequence">No sequence</span>`
      }

      setTimeout(() => {
        this.$refs.sequence.querySelector('#seqSelection').scrollIntoView({
          behavior: 'smooth',
          block: "nearest",
          inline: "center",
        });
      }, 100);

      console.log({
        "start" : start,
        "end" : end,
        "sequence" : sequence
      })


      start = start -1;

      if(end > sequence.length){
        end = sequence.length;
      }

      if(start < 0 ){
        start = 0;
      }

      const colorN = (sequence) =>{
        return sequence.split("").map( (n)=>{
          return `<span class="${n.toUpperCase()}">${n}</span>`
        }).join("")
      }

      const left = colorN(sequence.slice(0, start));
      const middle = colorN(sequence.slice(start, end ));
      const right = colorN(sequence.slice(end));


      return `${left}<span id="seqSelection" style="background:#31a0ff47">${middle}</span>${right}`
    }
  },
};
</script>
<style>

.A{color:green}
.T{color:red}
.G{color:orange}
.C{color:blue}

</style>
<style scoped>


.sbolSequence {
  height: 200px;
  background-color: #fff;
  border-radius: 5px 5px 0 0;
  position: relative;
  margin: 1px 0;

}

.sequence {
  word-break: break-word;
  text-transform: uppercase;
  line-height: 2em;
  padding: 8px;
  font-family: monospace;
  font-size: 16px;
}

.scrollable {
  overflow-y: scroll;
  height: 200px;
}


</style>
