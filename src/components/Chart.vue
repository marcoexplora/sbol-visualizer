<template>
    <div>
        <svg></svg>   
    </div>
</template>
<script>
import * as d3 from 'd3';

export default {
    props: ["annotations"],
    data() {
        return {
            editor: null
        }
    },
    methods: {
        render(val) {
            window.console.log(val);
            this.editor = d3.select("svg");
        }
    },
    watch: {
        annotations(val) {
            if (this.editor !== null) this.editor.select("svg").empty();
            this.render(val); 
        }
    }
}
</script>
<style scoped lang="sass">

</style>
