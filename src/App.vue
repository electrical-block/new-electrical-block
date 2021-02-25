<template>
  <div style="display: flex; justify-content: space-around">
    <Canvas />
    <ItemTable />
  </div>
</template>

<script>
import Canvas from '@/components/Canvas.vue'
import ItemTable from '@/components/ItemTable.vue'

export default {
  components: {
    Canvas,
    ItemTable
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
  margin-top: 60px;
}
</style>
