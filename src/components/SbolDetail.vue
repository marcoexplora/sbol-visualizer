<template>
  <div class="detailAnnotation">

    <div class="card-body">

      <ul v-if="!annotation">
        <li>No Sbol component selected</li>
      </ul>
      <ul v-else-if="annotation.style === 'initial' || !this.detail.name">
        <SbolDetailInitialPage/>
      </ul>

      <div v-else>
        <ul class="listDetail p0">

          <li class="h1 bold p0">
            {{ this.detail.name }}
          </li>

          <li v-if="this.detail.partID">
            <span class="bold">Part ID:</span>
            {{ this.detail.partID }}
          </li>

          <li v-if="this.detail.persistentIdentity">
            <span class="bold">Persistent Identity:</span>
            <a :href="this.detail.persistentIdentity" target="_blank">
              {{ this.detail.persistentIdentity }}
            </a>
          </li>

          <li v-if="this.detail.SBOL">
            <span class="bold">Sequence Ontology:</span>
            <a :href="this.detail.href" target="_blank">
              {{ this.detail.SBOL }}
            </a>
          </li>

          <li v-if="this.detail.propriety && this.detail.propriety.Direction">
            <span class="bold">Direction: </span> <span> {{ this.detail.propriety.Direction }}</span> <span
              v-if="this.detail.end > 0">( {{ this.detail.start }}..{{ this.detail.end }} )</span>
          </li>

          <li v-if="this.detail.propriety && this.detail.propriety.Description">
            {{ this.detail.propriety.Description }}
          </li>

          <li v-if="this.detail.mutableDescription">
            <p class="m0"><span class="bold">Mutable Description: </span> {{ this.detail.mutableDescription }}</p>
          </li>
          <!--          {{this.detail.propriety.start}}
                    {{this.detail.propriety.end}}
                    <div class="sequence">
                    {{this.sequence}}
                    </div>-->
          <!--
          <li class="comingsoon">
            <h2>Where is my sequence?</h2>
            <p>Sequence viewer coming soon!</p>
          </li>
          -->
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import SbolDetailInitialPage from "@/components/SbolDetailInitialPage";

export default {
  props: ["annotation", "tags", "sequence"],
  data() {
    return {
      detail: {}
    };
  },
  components: {
    SbolDetailInitialPage,

  },
  watch: {
    annotation: function (data) {
      if (typeof data !== "undefined" && data !== null) {
        this.detail = this.annotation;
        this.detail.href = `http://identifiers.org/so/${this.detail.SBOL}`;
      }
    }
  },
};
</script>
<style scoped>
.comingsoon {
  padding: 2em 1em;
  background: #f0f2f5;
  margin: 3em auto;
  width: 60%;
  border-radius: 5px;
  text-align: center;
}

.sequence {
  word-break: break-word;
  text-transform: uppercase;
  line-height: 2em;
  padding: 2em 0;
}

.detailAnnotation {
  margin-top: 5px;
  background-color: #fff;
  height: 290px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  word-break: normal;
  width: 100%;
  color: #4d4d4c;
}

.card-header {
  background-color: #f1f2f5;
  border-radius: 5px;
  padding: 0.05em;
  font-size: 0.6rem;
  font-weight: 400;
}

.card-header h2 {
  margin: 0.5em 1em 0.5em 1em;
}

.card-body {
  padding: 0;
  margin: 0;
}

.card-body > ul {
  margin: 0;
  padding: 1em;
}

.card-body > div {
  padding: 0 1em 0 1em;
}

.card-body > div h2 {
  font-size: 1.2em;
  font-weight: bold;
}

li, pre {
  width: 100%;
  overflow: auto;
  padding-top: 10px;
  word-break: break-word;
}

.bold {
  font-weight: bold;
}

.p0 {
  padding: 0
}

.m0 {
  margin: 0
}

.initial h2 {
  font-size: 20px;
  margin: 5px;
}

.initial img {
  max-width: 70%;
  max-height: 234px;
  margin: auto;
  border-radius: 300px;
}
</style>
