
export default function getRelationChart (than) {
  var RelationChart = []
  var flag = 0
  var unm = 0
  Object.keys(than.pins).forEach(itemId => {
    unm = 0
    than.pins[itemId].forEach(pin => {
      flag = 1
      RelationChart.forEach(e => {
        if (e.indexOf(itemId + '=>' + String(unm)) !== -1) {
          flag = 0
        }
      })
      if (flag === 1) {
        RelationChart.push(deepTraceLineFun(pin.svgCoordinate, 'Nope', than))
      }
      unm += 1
    })
  })
  return RelationChart
}
function deepTraceLineFun (pin, onlineid = 'Nope', than) {
  var jret = []
  jret.push(getIdforxy(pin, than))
  Object.keys(than.lines).forEach(lineId => {
    if (than.lines[lineId][0] === pin && onlineid !== lineId) {
      jret = jret.concat(deepTraceLineFun(than.lines[lineId][than.lines[lineId].length - 1], lineId, than))
    }
    if (than.lines[lineId][than.lines[lineId].length - 1] === pin && onlineid !== lineId) {
      jret = jret.concat(deepTraceLineFun(than.lines[lineId][0], lineId, than))
    }
  })
  return jret
}
function getIdforxy (xy, than) {
  var j = 'Nope'
  var unm = 0
  Object.keys(than.pins).forEach(itemId => {
    unm = 0
    than.pins[itemId].forEach(pin => {
      if (xy === pin.svgCoordinate) {
        j = itemId + '=>' + unm
      }
      unm += 1
    })
  })
  return j
}
