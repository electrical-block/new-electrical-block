<template>
  <div>
    <svg
      id="svg"
      width="600"
      height="300"
      :viewBox="svgMove.x + ' ' + svgMove.y + ' ' + svgMove.w + ' ' + svgMove.h"
      @mousedown="touchSvg($event)"
      @mousemove="touchSvg($event)"
      @mouseup="touchSvg($event)"
      @mousewheel="touchSvg($event)"
      @drop="getDropItem($event)"
      @dragover="allowDrop($event)"
    >
      <rect
        x="0"
        y="0"
        fill="none"
        stroke="white"
        stroke-width="2"
        width="600"
        height="300"
      />
      <g ref="drawingContainer">
        <Line
          v-for="(line, index) in lines"
          :key="index"
          :lineID="index"
          :line="line"
        />

        <Item
          v-for="(item, itemId, index) in items"
          :key="index"
          :item-id="itemId"
          :item="item"
          @touch-item="touchItem"
          @touch-pin="touchPin"
        />
      </g>
    </svg>
    <br>
    <button @click="zoomToFit">
      zoom to fit
    </button>
  </div>
</template>

<script>
import Item from '@/components/Item.vue'
import Line from '@/components/Line.vue'

import addItem from '@/js/addItem.js'
import touchItem from '@/js/touchItem.js'
import touchPin from '@/js/touchPin.js'
import touchSvg from '@/js/touchSvg.js'

export default {
  components: { Item, Line },
  data () {
    return {
      items: {},
      pins: {},
      lines: {},
      svgMove: {
        x: 0,
        y: 0,
        w: 600,
        h: 300,
        isMove: false
      },
      itemMove: {
        dx: 0,
        dy: 0,
        id: null,
        isMove: false
      },
      lineMove: { id: null, isMove: false }
    }
  },
  methods: {
    addItem (itemName) {
      addItem(itemName, this)
    },
    touchItem (event, itemId) {
      touchItem(event, itemId, this)
    },
    touchPin (event, pinIndex, itemId) {
      touchPin(event, pinIndex, itemId, this)
    },
    touchSvg (event) {
      touchSvg(event, this)
    },
    getDropItem (event) {
      if (event.dataTransfer.getData('item-name') !== '') {
        this.addItem(event.dataTransfer.getData('item-name'))
      }
    },
    allowDrop (event) {
      event.preventDefault()
    },
    zoomToFit () {
      const elementPositionAndSize = this.$refs.drawingContainer.getBBox()
      var scaleRatio = 0

      this.svgMove.x = (elementPositionAndSize.x - this.svgMove.w / 2 + elementPositionAndSize.width / 2)
      this.svgMove.y = (elementPositionAndSize.y - this.svgMove.h / 2 + elementPositionAndSize.height / 2)

      if (elementPositionAndSize.width / elementPositionAndSize.height > 2) {
        scaleRatio = elementPositionAndSize.width / this.svgMove.w
      } else {
        scaleRatio = elementPositionAndSize.height / this.svgMove.h
      }

      this.svgMove.x -= 300 * (scaleRatio - 1) * (this.svgMove.w / 600)
      this.svgMove.y -= 150 * (scaleRatio - 1) * (this.svgMove.h / 300)
      this.svgMove.w *= scaleRatio
      this.svgMove.h *= scaleRatio
    }
  }
}
</script>
