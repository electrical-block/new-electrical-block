
export default function getRelationChart (then) {
  var RelationChart = []
  var flag = 0
  var unm = 0
  var index = 0
  Object.keys(then.pins).forEach((itemId) => {
    unm = 0
    then.pins[itemId].forEach(pin => {
      flag = 1
      RelationChart.forEach(e => {
        if (e.indexOf(itemId + '=>' + String(unm)) !== -1) {
          flag = 0
        }
      })
      if (flag === 1) {
        RelationChart[String(index)] = deepTraceLineFun(pin.svgCoordinate, 'Nope', then)
        index++
      }
      unm += 1
    })
  })
  return RelationChart
}
function deepTraceLineFun (pin, onlineid = 'Nope', then) {
  var jret = []
  jret.push(getIdforxy(pin, then))
  Object.keys(then.lines).forEach(lineId => {
    if (then.lines[lineId][0] === pin && onlineid !== lineId) {
      jret = jret.concat(deepTraceLineFun(then.lines[lineId][then.lines[lineId].length - 1], lineId, then))
    }
    if (then.lines[lineId][then.lines[lineId].length - 1] === pin && onlineid !== lineId) {
      jret = jret.concat(deepTraceLineFun(then.lines[lineId][0], lineId, then))
    }
  })
  return jret
}
function getIdforxy (xy, then) {
  var j = 'Nope'
  var unm = 0
  Object.keys(then.pins).forEach(itemId => {
    unm = 0
    then.pins[itemId].forEach(pin => {
      if (xy === pin.svgCoordinate) {
        j = itemId + '=>' + unm
      }
      unm += 1
    })
  })
  return j
}
