<template>
  <div>
    <h1>Item 欄</h1>
    <img
      v-for="(item, index) in items"
      :key="`image-${index}`"
      :src="item.path"
      draggable="true"
      @dragstart="setData($event, item.name)"
    >
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: {
        resistor: {
          path: require('@/assets/Resistor.png'),
          name: 'Resistor'
        },
        led: {
          path: require('@/assets/Led.png'),
          name: 'Led'
        }
      }
    }
  },
  methods: {
    setData (event, itemName) {
      event.dataTransfer.setData('item-name', itemName)
    }
  }
}
</script>
