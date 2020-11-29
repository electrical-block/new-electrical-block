<template>
  <div>
    <input
      type="button"
      value="增加電阻"
      @mousedown="addItem('Resistor')"
    >
    <input
      type="button"
      value="增加LED"
      @mousedown="addItem('Led')"
    >

    <svg
      id="svg"
      width="600"
      height="300"
      :viewBox="svg.x + ' ' + svg.y + ' ' + svg.w + ' ' + svg.h"
      @mousedown="touchSvg($event)"
      @mousemove="touchSvg($event)"
      @mouseup="touchSvg($event)"
      @mousewheel="touchSvg($event)"
    >
      <rect
        x="0"
        y="0"
        fill="none"
        stroke="#EB7B2D"
        stroke-width="2"
        width="600"
        height="300"
      />
      <g>
        <path
          v-for="(line, index) in lines"
          :id="index"
          :key="index"
          :d="
            'M ' + line.position1.x + ' ' + line.position1.y + ' L ' + line.position2.x + ' ' + line.position2.y
          "
          stroke="#7cfc00"
          stroke-width="5"
        />
      </g>
      <g>
        <Item
          v-for="(item, index) in items"
          :key="index"
          :item="item"
          @touch-item="touchItem"
          @touch-pin="touchPin"
        />
      </g>
    </svg>
  </div>
</template>
<script>
import Item from '@/components/Item.vue'

import addItem from '@/js/addItem.js'
import touchItem from '@/js/touchItem.js'
import touchPin from '@/js/touchPin.js'
import touchSvg from '@/js/touchSvg.js'

export default {
  components: { Item },
  data () {
    return {
      items: {},
      pins: {},
      lines: {},
      svg: {
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
    addLine (lineId) {
      this.lines[lineId] = {
        position1: { x: 0, y: 0 },
        position2: { x: 0, y: 0 }
      }
    },
    touchItem (event, itemId) {
      touchItem(event, itemId, this)
    },
    touchPin (event, pinId, itemId) {
      touchPin(event, pinId, itemId, this)
    },
    touchSvg (event) {
      touchSvg(event, this)
    }
  }
}
</script>
