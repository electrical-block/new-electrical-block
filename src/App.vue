<template>
  <div>
    <Header />
    <Canvas :svg-width-compensation="svgWidthCompensation" />
    <ItemTable @collapseItemTable="isReduceSvgWidth" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Canvas from '@/components/Canvas.vue'
import ItemTable from '@/components/ItemTable.vue'

export default {
  components: {
    Canvas,
    ItemTable,
    Header
  },
  data () {
    return {
      svgWidthCompensation: false
    }
  },
  methods: {
    isReduceSvgWidth (isCollapse) {
      this.svgWidthCompensation = isCollapse
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
