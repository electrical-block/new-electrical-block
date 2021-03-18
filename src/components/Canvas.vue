<template>
  <div style="display: block;">
    <div>
      <svg
        id="svg"
        class="fixed bottom-0"
        :width="windowSize.width"
        :height="windowSize.height"
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
            :line-i-d="index"
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
      <!-- <button @click="simulationRun">
        Simulation Run
      </button>
      <button @click="simulationStop">
        stop
      </button> -->
    </div>
    <button
      class="fixed z-50 rounded-full bg-gray-200 p-3"
      style="outline: none; bottom: 25px; left: 25px; width: 50px;"
      @click="zoomToFit"
    >
      <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxnPg0KCQkJPHBhdGggZD0iTTEyOCwzMlYwSDE2QzcuMTYzLDAsMCw3LjE2MywwLDE2djExMmgzMlY1NC41NkwxODAuNjQsMjAzLjJsMjIuNTYtMjIuNTZMNTQuNTYsMzJIMTI4eiIvPg0KCQkJPHBhdGggZD0iTTQ5NiwwSDM4NHYzMmg3My40NEwzMDguOCwxODAuNjRsMjIuNTYsMjIuNTZMNDgwLDU0LjU2VjEyOGgzMlYxNkM1MTIsNy4xNjMsNTA0LjgzNywwLDQ5NiwweiIvPg0KCQkJPHBhdGggZD0iTTQ4MCw0NTcuNDRMMzMxLjM2LDMwOC44bC0yMi41NiwyMi41Nkw0NTcuNDQsNDgwSDM4NHYzMmgxMTJjOC44MzcsMCwxNi03LjE2MywxNi0xNlYzODRoLTMyVjQ1Ny40NHoiLz4NCgkJCTxwYXRoIGQ9Ik0xODAuNjQsMzA4LjY0TDMyLDQ1Ny40NFYzODRIMHYxMTJjMCw4LjgzNyw3LjE2MywxNiwxNiwxNmgxMTJ2LTMySDU0LjU2TDIwMy4yLDMzMS4zNkwxODAuNjQsMzA4LjY0eiIvPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=">
    </button>
    <!-- <div style="text-align:left; display: flex;">
      <div
        v-for="(monacoEditor, index) in monacoEditors"
        :key="index"
      >
        <MonacoEditor
          width="300"
          height="300"
          theme="vs"
          language="cpp"
          :options="monacoEditor.options"
          :code="monacoEditor.code"
          @mounted="(editor)=>{monacoEditor.editor=editor}"
        />
        <p>{{ monacoEditor.statusLabel }}</p>
      </div>
    </div> -->
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
// import MonacoEditor from 'vue-monaco-editor'
import addevent from '@/js/addevent.js'
import simulationrun from '@/js/simulationrun.js'

const MHZ = 16000000
const CPUS = []
const simulationFuntion = {}
const lineVoltage = {}
let runFlag = 0
export default {
  components: {
    Item,
    Line
  },
  props: {
    svgWidthCompensation: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      monacoEditors: {},
      items: {},
      pins: {},
      lines: {},
      windowSize: {
        height: 0,
        width: 0,
        ratio: 0
      },
      svgMove: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        isMove: false
      },
      itemMove: {
        dx: 0,
        dy: 0,
        id: null,
        isMove: false
      },
      lineMove: {
        id: null,
        isMove: false
      }
    }
  },
  watch: {
    svgWidthCompensation () {
      this.windowOnResize()
    }
  },
  created () {
    this.windowOnResize()
    this.svgMove.w = this.windowSize.width
    this.svgMove.h = this.windowSize.height
  },
  mounted () {
    const that = this
    window.onresize = function () {
      that.windowSize.width = window.innerWidth
      that.windowSize.height = window.innerHeight - 60
    }
  },
  methods: {
    windowOnResize () {
      this.windowSize.width = window.innerWidth
      this.windowSize.height = window.innerHeight - 60

      if (!this.svgWidthCompensation && this.windowSize.width > 300) {
        this.windowSize.width = this.windowSize.width - 300
      }

      this.windowSize.ratio = this.windowSize.width / this.windowSize.height
    },
    simulationStop () {
      runFlag = 0
      console.log(CPUS)
    },
    async simulationRun () {
      await simulationrun(this, runFlag, CPUS, MHZ, lineVoltage, simulationFuntion)
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
      let scaleRatio = 0
      const windowRatio = this.windowSize.ratio

      this.svgMove.x = (elementPositionAndSize.x - this.svgMove.w / windowRatio + elementPositionAndSize.width / windowRatio)
      this.svgMove.y = (elementPositionAndSize.y - this.svgMove.h / windowRatio + elementPositionAndSize.height / windowRatio)

      if (elementPositionAndSize.width / elementPositionAndSize.height > windowRatio) {
        scaleRatio = elementPositionAndSize.width / this.svgMove.w
      } else {
        scaleRatio = elementPositionAndSize.height / this.svgMove.h
      }

      if (scaleRatio === 0) {
        scaleRatio = 1
      }

      this.svgMove.x -= (this.windowSize.width / windowRatio) * (scaleRatio - 1) * (this.svgMove.w / this.windowSize.width)
      this.svgMove.y -= (this.windowSize.height / windowRatio) * (scaleRatio - 1) * (this.svgMove.h / this.windowSize.height)

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
