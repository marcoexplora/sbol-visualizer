<template>
  <div class="sbolSequence" :ref="'sequence'">
    <div class="scrollable">
      <div class="sequence" v-html="this.showSelection(sequence,this.getStart(),this.getEnd())"></div>
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
      if (this.selected.propriety) {
        return parseInt(this.selected.propriety.start)
      }
      return 0
    },
    getEnd() {
      if (this.selected.propriety) {
        return parseInt(this.selected.propriety.end)
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

      const left = sequence.slice(0, start);
      const middle = sequence.slice(start, end );
      const right = sequence.slice(end);

      return `${left}<span id="seqSelection" style="background: #31a0ff24;color:#3578b6">${middle}</span>${right}`
    }
  },
};
</script>

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
