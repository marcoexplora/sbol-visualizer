<template>
  <div class="sbolSequence" :ref="'sequence'" >
    <div class="scrollable" :start="this.getStart()" :end="this.getEnd()">
      <div class="sequence" v-html="this.showSelection(sequence,this.getStart(),this.getEnd())" ></div>
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
      if(this.selected.propriety){
        return parseInt(this.selected.propriety.start)
      }
      return 0
    },
    getEnd() {
      if(this.selected.propriety) {
        return parseInt(this.selected.propriety.end)
      }
      return 0
    },
    showSelection(sequence, start, end){
      return `${sequence.slice(0,start -1)}<span style="background: #b1b1b124;color:red">${sequence.slice(start,end)}</span>${sequence.slice(end)}`
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
  margin: 1px 0px;

}
.sequence{
  word-break: break-word;
  text-transform: uppercase;
  line-height: 2em;
  padding: 8px;
  font-family: monospace;
  font-size: 16px;
}

.scrollable{
  overflow-y: scroll;
  height: 200px;
}
</style>
