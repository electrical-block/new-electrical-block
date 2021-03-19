export default function addevent (id, itemName, then, simulationFuntion, lineVoltage) {
  simulationFuntion[id] = { Function: {}, data: {} }
  switch (itemName) {
    case 'multiplier':// 乘法器
      simulationFuntion[id].Function = () => {
        lineVoltage[id + '=>2'].v = lineVoltage[id + '=>0'].v * lineVoltage[id + '=>1'].v
        if (lineVoltage[id + '=>2'].v > 9) { lineVoltage[id + '=>2'].v = 9 }
        if (lineVoltage[id + '=>2'].v < 0) { lineVoltage[id + '=>2'].v = 0 }
      }
      break
    case 'sawtoothWave':// 鋸齒波器
      simulationFuntion[id].Function = (rundata) => {
        lineVoltage[id + '=>1'].v = (rundata.clock % 1000 / 1000) * 9
      }
      break
    case 'adder':// 加法器
      simulationFuntion[id].Function = () => {
        lineVoltage[id + '=>2'].v = lineVoltage[id + '=>0'].v + lineVoltage[id + '=>1'].v
        if (lineVoltage[id + '=>2'].v > 9) { lineVoltage[id + '=>2'].v = 9 }
        if (lineVoltage[id + '=>2'].v < 0) { lineVoltage[id + '=>2'].v = 0 }
      }
      break
    case 'subtractor':// 減法器
      simulationFuntion[id].Function = () => {
        lineVoltage[id + '=>2'].v = lineVoltage[id + '=>0'].v - lineVoltage[id + '=>1'].v
        if (lineVoltage[id + '=>2'].v > 9) { lineVoltage[id + '=>2'].v = 9 }
        if (lineVoltage[id + '=>2'].v < 0) { lineVoltage[id + '=>2'].v = 0 }
      }
      break
    case 'monitor':// 監視器
      simulationFuntion[id].Function = (rundata) => {
        if (rundata.clock % 50000 === 0) {
          then.items[id].data.voltage = lineVoltage[id + '=>0'].v
        }
      }
      break
    case 'outPutConstant':// 輸出常數
      simulationFuntion[id].Function = () => {
        lineVoltage[id + '=>0'].v = 1
      }
      break
    case 'squareWaveGenerator':// 方波產生器
      simulationFuntion[id].Function = (rundata) => {
        if (rundata.clock % 10000 === 0) {
          if (lineVoltage[id + '=>2'].v === 0)lineVoltage[id + '=>2'].v = 9
          else if (lineVoltage[id + '=>2'].v === 9)lineVoltage[id + '=>2'].v = 0
        }
      }
      break
    case 'arduinoUno':// Arduino Uno
      simulationFuntion[id].Function = () => {
      }
      break
  }
}
