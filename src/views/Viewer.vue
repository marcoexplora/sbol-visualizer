<template>
    <div>
        <div>
            <ul>
                <app-annotation 
                    v-for='(item, index) in annotations' 
                    v-bind:key="index" 
                    :annotation="item"
                    :id="index" 
                    v-on:detail="showDetail" >
                    {{ item }}
                    </app-annotation>
            </ul>
        </div>
        <app-chart :annotations="annotations"></app-chart>
        <app-detail :annotation="annotation"></app-detail>
    </div>
</template>
<script>
import ItemAnnotation from '../components/ItemAnnotation';
import Chart from '../components/Chart';
import Detail from '../components/Detail';

export default {
    props: ["source"],       
    data() {
        return {
            annotations: [],
            annotation: null,
            test: [1,2,3]
        }
    },
    methods: {
        showDetail: function(data) {
            window.console.log("showDetail",data)
        }
    },
    components: {
        'app-chart': Chart,
        'app-detail': Detail,
        'app-annotation': ItemAnnotation
    },
    watch: {
        source: function(data) {
            window.console.log(data)
            this.annotations = data.annotations;            
        }
    }
}
</script>
<style scoped lang="sass">

</style>
