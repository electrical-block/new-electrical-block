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
      lineMove.isMove = true

      // generate a new ID
      lineMove.id = SvgTool_.generateUserId()
      that.addLine(lineMove.id)

      // one of positions of line is equal to one of position of pin
      console.log(123)
      console.log(pins)
      lines[lineMove.id].position1 = pins[itemId][pinIndex].svgCoordinate

      // init another of position of line
      lines[lineMove.id].position2.x = mousePosition.x
      lines[lineMove.id].position2.y = mousePosition.y
    } else {
      // if mousedown at another specified pin
      console.log(456)
      console.log(pins)
      lines[lineMove.id].position2 = pins[itemId][pinIndex].svgCoordinate
      lineMove.isMove = false
    }
  } else if (event.type === 'mousemove') {
    // another of position of line is equal to the position of mouse
    lines[lineMove.id].position2.x = mousePosition.x
    lines[lineMove.id].position2.y = mousePosition.y
  }
}
