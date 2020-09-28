<template>
  <section>
    <div class="search">
      <input type="text" class="search-input" placeholder="Search in annotations" v-model="filter" />
    </div>
    <ul class="search-list">
      <li v-if="selectedItems.length == 0">No Sbol component found</li>
      <li v-for="(item, index) in selectedItems" :key="index" @click="detailItem(item.index)">
        <div>
          <ol>
            <li class="h1">
              <b>Name:</b>
              <span>{{ item.name }}</span>
            </li>

            <li class="text-muted-black h2">
              <b>Sequence Ontology:</b>
              <span>{{ item.SBOL }}</span>
            </li>

            <li class="text-muted-black h2">
              <b>Direction:</b>
              <span>{{ item.direction }}</span>
            </li>
          </ol>
        </div>

        <span v-if="item.end > 0">{{ item.start }}…{{ item.end }}</span>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  props: ["annotations"],
  data() {
    return {
      filter: "",
    };
  },
  computed: {
    selectedItems() {
      return this.annotations.filter((so) => {
        if (this.filter === "") {
          return so;
        }

        if (/^\d+$/.test(this.filter)) {
          const loc = parseInt(this.filter);
          return so.start <= loc && so.end >= loc;
        } else {
          return (
            so.name.toLowerCase().includes(this.filter.toLowerCase()) ||
            so.start.toString().includes(this.filter.toString()) ||
            so.SBOL.toString().includes(this.filter.toString()) ||
            so.end.toString().includes(this.filter.toString()) ||
            so.direction.toLowerCase().includes(this.filter.toString())
          );
        }
      });
    },
  },
  methods: {
    detailItem(so) {
      window.console.log(
        "detailItem from ListAnnotations",
        this.annotations[so]
      );
      this.$emit("selectedAnnotation", so);
    },
  },
};
</script>
<style scoped>
.search {
  margin: 0;
  font-size: 10px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  background-color: #f0f2f5;
}
section {
  height: 75vh;
  overflow-y: scroll;
}
section * {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.search-input {
  width: 100%;
  height: 3em;
  padding: 0 5px;
  font-size: 1.2em;
  border: none;
  background-color: #f0f2f5;
}

.search-list {
  list-style: none;
  padding: 0;
  text-align: left;
  margin-top: 5px;
  min-height: 400px;
}
.search-list *{
  color:  #4d4d4c
}

.search-list > li:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
ol{
  padding: 0px
}
ol > li {
  padding: 5px;
}
.search-list > li {
  position: relative;
  display: block;
  padding: 0.75rem 10px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  display: flex !important;
  -webkit-box-pack: justify !important;
  justify-content: space-between !important;
  -webkit-box-align: center !important;
  align-items: center !important;
}
.search-list > li b {
  padding-right: 5px;
}
.search-list > li ul {
  padding-left: 0;
  list-style: none;
}
.search-list > li div {
  display: flex !important;
}
.search-list > li span {
  font-size: 0.9em;
}
.text-muted-black {
  color: #6c757d;
}
.small{
  font-size: 80%;
}
.px-1{
  padding:5px 0;
}
</style>
