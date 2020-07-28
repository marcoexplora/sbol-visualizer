<template>
  <div id="detailAnnotation">
    <div class="card-header">
      <h2>Details</h2>
    </div>
    <div class="card-body">
      <ul v-if="!annotation">
        <li>No Sbol component found</li>
      </ul>
      <div v-else>
        <ul class="listDetail">
          <li>
            <b>SO:</b>
            <span>
              <a target="_blank" :href="this.detail.href">{{this.detail.SBOL}}</a>
            </span>
          </li>
        </ul>

        <b>Notes</b>
        {{this.detail.notes}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["annotation"],
  data() {
    return {
      detail: {}
    };
  },
  watch: {
    annotation: function(data) {
      window.console.log("watch from detail", data);
      if (typeof data !== "undefined") {
        this.detail = this.annotation;
        this.detail.href = `http://identifiers.org/so/${this.detail.SBOL}`;
      }
    }
  }
};
</script>
<style scoped>
#detailAnnotation {
  margin-top: 5px;
  background-color: #fff;
  height: calc(100vh - 33vh);
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  font-family: Helvetica;
  word-break: break-all;
}
.card-header {
  background-color: #f1f2f5;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  margin: 1em 0em 1em 0em;
  padding: 0.05em;
  font-size: 0.6rem;
  font-weight: 400;
}

.card-header h2 {
  margin: 0.5em 1em 0.5em 1em;
  color: #929fb0;
}

.card-body {
  padding: 0;
  margin: 0;
}
.card-body > ul {
  margin: 0;
  padding: 1em;
}

.card-body > ul > li {
  display: flex;
  padding: 0.6em;
  border: 1px solid #f1f2f5;
  border-left: none;
  border-right: none;
  background-color: #f1f2f5;
}

.card-body > ul > li:nth-child(even) {
  background-color: #fff;
}
.card-body > div {
  padding: 0 1em 0 1em;
}
.card-body > div h2 {
  font-size: 1.2em;
  font-weight: bold;
}
li {
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
</style>
