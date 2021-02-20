<template>
  <div style="display: block;">
    <div>
      <svg
        id="svg"
        width="600"
        height="300"
        :viewBox="svgMove.x + ' ' + svgMove.y + ' ' + svgMove.w + ' ' + svgMove.h"
        tabindex="0"
        @mousedown="touchSvg($event)"
        @mousemove="touchSvg($event)"
        @mouseup="touchSvg($event)"
        @mousewheel="touchSvg($event)"
        @drop="getDropItem($event)"
        @dragover="allowDrop($event)"
        @keydown="keyup($event)"
      >
        <rect
          x="0"
          y="0"
          stroke="#2828FF"
          stroke-width="2"
          width="0"
          height="0"
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
      <button @click="simulationRun">
        Simulation Run
      </button>
      <button @click="simulationStop">
        stop
      </button>
    </div>
    <div style="text-align:left; display: flex;">
      <div
        v-for="(monacoEditor, index) in monacoEditors"
        :key="index"
      >
        <MonacoEditor
          width="200"
          height="300"
          theme="vs"
          language="cpp"
          :options="monacoEditor.options"
          :code="monacoEditor.code"
          @mounted="(editor)=>{monacoEditor.editor=editor}"
        />
        <p>{{ monacoEditor.statusLabel }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Item from '@/components/Item.vue'
import Line from '@/components/Line.vue'
import addItem from '@/js/addItem.js'
import touchItem from '@/js/touchItem.js'
import touchPin from '@/js/touchPin.js'
import touchSvg from '@/js/touchSvg.js'
import keyBoard from '@/js/keyBoard.js'
import getRelationChart from '@/js/getRelationChart.js'
import MonacoEditor from 'vue-monaco-editor'
import { buildHex } from '@/avrjs/compile.js'
import { AVRRunner } from '@/avrjs/execute.js'
import { avrInstruction } from 'avr8js'
import { formatTime } from '@/avrjs/format-time'
import addevent from '@/js/addevent.js'

const MHZ = 16000000
var CPUS = []
var simulationFuntion = {}
var lineVoltage = {}
var runFlag = 0
export default {
  components: { Item, Line, MonacoEditor },
  data () {
    return {
      monacoEditors: {},
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
    simulationStop () {
      runFlag = 0
    },
    async simulationRun () {
      runFlag = 1
      var lineRelation = getRelationChart(this)
      var size = lineRelation.length // Unknown quantity
      if (size === 0) return 0
      var clock = 0
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < lineRelation[i].length; j++) {
          if (j === 0) {
            lineVoltage[lineRelation[i][j]] = { v: 0 }
          } else {
            lineVoltage[lineRelation[i][j]] = lineVoltage[lineRelation[i][0]]
          }
        }
      }
      /// Compile HEX
      for (const id of Object.keys(CPUS)) {
        this.monacoEditors[id].statusLabel = 'compile......'
        const runner = await buildHex(this.monacoEditors[id].editor.getValue())
        CPUS[id] = new AVRRunner(runner.hex)
        CPUS[id].id = id
        this.monacoEditors[id].statusLabel = 'OK'
        /// arduino simulation add event
        CPUS[id].portB.addListener(value => {
          value = this.decToBin(value).split('').reverse().join('')
          for (let i = 6; i > 0; i--) {
            lineVoltage[id + '=>' + String(i)].v = parseInt(value[6 - i], 10)
          }
        })
        CPUS[id].portD.addListener(value => {
          value = this.decToBin(value)
          for (let i = 7; i < 15; i++) {
            lineVoltage[id + '=>' + String(i)].v = parseInt(value[7 - (i - 7)], 10)
          }
        })
        CPUS[id].portC.addListener(value => {
          value = this.decToBin(value)
          for (let i = 20; i < 26; i++) {
            lineVoltage[id + '=>' + String(i)].v = parseInt(value[i - 20], 10)
          }
        })
        lineVoltage[id + '=>0'].v = 0
        lineVoltage[id + '=>18'].v = 0
        lineVoltage[id + '=>17'].v = 0
        lineVoltage[id + '=>16'].v = 5
        lineVoltage[id + '=>15'].v = 3.3
      }

      /// Start simulation
      for (;;) {
        for (const CPU of Object.values(CPUS)) {
          if (CPU.cpu.cycles % 50000 === 0) {
            const time = formatTime(CPU.cpu.cycles / MHZ)
            this.monacoEditors[CPU.id].statusLabel = 'Simulation time: ' + time
            await new Promise(resolve => setTimeout(resolve, 0))
          }
          avrInstruction(CPU.cpu)
          CPU.cpu.tick()
        }
        Object.values(simulationFuntion).forEach((Func) => {
          Func.Function({ clock: clock })
        })
        if (runFlag === 0) { break }
        clock++
      }
    },
    addItem (itemName) {
      const id = addItem(itemName, this, CPUS)
      addevent(id, itemName, this, simulationFuntion, lineVoltage)
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
        event.preventDefault()
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
    },
    keyup (event) {
      keyBoard(event, this)
    },
    decToBin (value) {
      return value.toString(2).padStart(8, '0')
    }
  }
}
</script>
