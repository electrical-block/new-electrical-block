<template>
  <div>
    <h1>Item 欄</h1>
    <img
      v-for="(item, index) in items"
      :key="`image-${index}`"
      :src="item.path"
      draggable="true"
      width="50"
      height="50"
      @dragstart="setData($event, item.name)"
    >
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: {}
    }
  },
  created () {
    const itemDescription = require('@/json/itemDescription.json')
    Object.keys(itemDescription).forEach((key) => {
      this.items[key] = {
        path: require('@/assets/' + key + '.png'),
        name: key
      }
    })
  },
  methods: {
    setData (event, itemName) {
      event.dataTransfer.setData('item-name', itemName)
    }
  }
}
</script>
