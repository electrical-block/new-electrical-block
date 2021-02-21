import getRelationChart from '@/js/getRelationChart.js'
import { buildHex } from '@/avrjs/compile.js'
import { AVRRunner } from '@/avrjs/execute.js'
import { avrInstruction } from 'avr8js'
import { formatTime } from '@/avrjs/format-time'

export default async function simulationrun (that, runFlag, CPUS, MHZ, lineVoltage, simulationFuntion) {
  runFlag = 1
  var lineRelation = getRelationChart(that)
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
    that.monacoEditors[id].statusLabel = 'compile......'
    const runner = await buildHex(that.monacoEditors[id].editor.getValue())
    CPUS[id] = new AVRRunner(runner.hex)
    CPUS[id].id = id
    that.monacoEditors[id].statusLabel = 'OK'
    /// arduino simulation add event
    CPUS[id].portB.addListener(value => {
      value = that.decToBin(value).split('').reverse().join('')
      for (let i = 6; i > 0; i--) {
        lineVoltage[id + '=>' + String(i)].v = parseInt(value[6 - i], 10)
      }
    })
    CPUS[id].portD.addListener(value => {
      value = that.decToBin(value).split('').reverse().join('')
      for (let i = 7; i < 15; i++) {
        lineVoltage[id + '=>' + String(i)].v = parseInt(value[7 - (i - 7)], 10)
      }
    })
    CPUS[id].portC.addListener(value => {
      value = that.decToBin(value).split('').reverse().join('')
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
        that.monacoEditors[CPU.id].statusLabel = 'Simulation time: ' + time
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
}
