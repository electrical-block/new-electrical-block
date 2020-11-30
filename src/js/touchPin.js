import SvgTool from '@/js/svgTool.js'
const SvgTool_ = new SvgTool()

export default function touchPin (event, pinIndex, itemId, that) {
  event.stopPropagation()

  const mousePosition = SvgTool_.client2Svg(event)
  var lineMove = that.lineMove
  var lines = that.lines
  var pins = that.pins

  if (event.type === 'mousedown') {
    if (!lineMove.isMove) {
      // generate a new ID
      lineMove.id = SvgTool_.generateId()
      addLine(lineMove.id, that)

      // one of positions of line is equal to one of position of pin
      lines[lineMove.id].position1 = pins[itemId][pinIndex].svgCoordinate

      // init another of position of line
      lines[lineMove.id].position2.x = mousePosition.x
      lines[lineMove.id].position2.y = mousePosition.y

      lineMove.isMove = true
    } else {
      // if mousedown at another specified pin
      lines[lineMove.id].position2 = pins[itemId][pinIndex].svgCoordinate

      lineMove.isMove = false
    }
  } else if (event.type === 'mousemove') {
    // another of position of line is equal to the position of mouse
    lines[lineMove.id].position2.x = mousePosition.x
    lines[lineMove.id].position2.y = mousePosition.y
  }
}

function addLine (lineId, that) {
  that.lines[lineId] = {
    position1: { x: 0, y: 0 },
    position2: { x: 0, y: 0 }
  }
}
