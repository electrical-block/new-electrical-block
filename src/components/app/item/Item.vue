<template>
  <g
    :id="itemId"
    :transform="
      'translate(' + item.position.transformX + ',' + item.position.transformY + ')'
        +' rotate('+item.position.rotate+')'
    "
    @mousedown="touchItem($event)"
  >
    <g v-if="item.name=='sawtoothWave'">
      <SawtoothWave
        :item="item"
      />
    </g>
    <g v-if="item.name=='adder'">
      <Adder
        :item="item"
      />
    </g>
    <g v-if="item.name=='arduinoUno'">
      <ArduinoUno
        :item="item"
      />
    </g>
    <g v-if="item.name=='monitor'">
      <Monitor
        :item="item"
      />
    </g>
    <g v-if="item.name=='multiplier'">
      <Multiplier
        :item="item"
      />
    </g>
    <g v-if="item.name=='outPutConstant'">
      <OutPutConstant
        :item="item"
      />
    </g>
    <g v-if="item.name=='squareWaveGenerator'">
      <SquareWaveGenerator
        :item="item"
      />
    </g>
    <g v-if="item.name=='subtractor'">
      <Subtractor
        :item="item"
      />
    </g>
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
import ElectricalComponents from '@/components/electricalComponents'

export default {
  components: ElectricalComponents,
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
    const itemDescription = require('./itemDescription.json')
    this.pins = itemDescription[this.item.name].pins
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

.item-off{
  stroke : "none";
}
.item-on{
  stroke :red;
  stroke-width : "1em";
}
</style>
