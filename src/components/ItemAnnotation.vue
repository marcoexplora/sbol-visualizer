<template>
    <li @click="detail">{{ id }} - {{ annotation.name }}-</li>    
</template>
<script>
export default {
    props: ["id","annotation"],
    methods: {
        detail() {            
            this.$emit('detail', this.annotation)
        },
    }

}
</script>
<style scoped lang="sass">

</style>
