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
      <SawtoothWave />
    </g>
    <g v-if="item.name=='adder'">
      <Adder />
    </g>
    <g v-if="item.name=='arduinoUno'">
      <ArduinoUno />
    </g>
    <g v-if="item.name=='monitor'">
      <Monitor />
    </g>
    <g v-if="item.name=='multiplier'">
      <Multiplier />
    </g>
    <g v-if="item.name=='outPutConstant'">
      <OutPutConstant />
    </g>
    <g v-if="item.name=='squareWaveGenerator'">
      <SquareWaveGenerator />
    </g>
    <g v-if="item.name=='subtractor'">
      <Subtractor />
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
import SawtoothWave from '@/components/ItemVue/sawtoothWave.vue'
import Adder from '@/components/ItemVue/adder.vue'
import ArduinoUno from '@/components/ItemVue/arduinoUno.vue'
import Monitor from '@/components/ItemVue/monitor.vue'
import Multiplier from '@/components/ItemVue/multiplier.vue'
import OutPutConstant from '@/components/ItemVue/outPutConstant.vue'
import SquareWaveGenerator from '@/components/ItemVue/squareWaveGenerator.vue'
import Subtractor from '@/components/ItemVue/subtractor.vue'

export default {
  components: { SawtoothWave, Subtractor, SquareWaveGenerator, OutPutConstant, Multiplier, Monitor, ArduinoUno, Adder },
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
