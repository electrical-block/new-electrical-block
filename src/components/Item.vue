<template>
  <g
    :id="itemId"
    :transform="
      'translate(' + item.position.transformX + ',' + item.position.transformY + ')'
    "
    @mousedown="touchItem($event)"
  >
    <!-- 未來待改，目前先用 v-html -->
    <!-- eslint-disable -->
    <g v-html="svgInnerHTML"></g>
    <!-- eslint-enable -->

    <circle
      v-for="(pin, index) in pins"
      :id="index"
      :key="index"
      class="pin"
      :cx="pin.cx"
      :cy="pin.cy"
      @mousedown="touchPin($event, index)"
    />
  </g>
</template>

<script>
export default {
  props: {
    itemId: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['touch-item', 'touch-pin'],
  data () {
    return {
      pins: null,
      svgInnerHTML: null
    }
  },
  created () {
    const itemDescription = require('@/json/itemDescription.json')

    this.svgInnerHTML = itemDescription[this.item.name].innerHTML
    this.pins = itemDescription[this.item.name].pins
    console.log(this.pins)
  },
  methods: {
    touchItem (event) {
      this.$emit('touch-item', event, this.itemId)
    },
    touchPin (event, pinIndex) {
      this.$emit('touch-pin', event, pinIndex, this.itemId)
    }

  }
}
</script>

<style scoped>
.pin {
  fill: rgb(33, 124, 177);
  r: 3;
  opacity: 0.5;
}

.pin:hover {
  fill: red;
  r: 5;
  opacity: 1;
}
</style>
