import SvgTool from './svgTool.js'
const SvgTool_ = new SvgTool()

export default function touchPin (event, pinIndex, itemId, that) {
  event.stopPropagation()

  const mousePosition = SvgTool_.client2Svg(event.clientX, event.clientY)
  var lineMove = that.lineMove
  var lines = that.lines
  var pins = that.pins

  if (event.type === 'mousedown') {
    // Item lights up and off
    if (that.itemMove.id !== null) that.items[that.itemMove.id].class = 'item-off'

    if (!lineMove.isMove) {
      // generate a new ID
      lineMove.id = SvgTool_.generateId()
      addLine(lineMove.id, that)

      // one of positions of line is equal to one of position of pin
      lines[lineMove.id][0] = pins[itemId][pinIndex].svgCoordinate

      // init another of position of line
      lines[lineMove.id][lines[lineMove.id].length - 1].x = mousePosition.x
      lines[lineMove.id][lines[lineMove.id].length - 1].y = mousePosition.y

      lineMove.isMove = true
    } else {
      // if mousedown at another specified pin
      lines[lineMove.id][lines[lineMove.id].length - 1] = pins[itemId][pinIndex].svgCoordinate

      lineMove.isMove = false

      // If there are duplicate segments, delete them
      Object.keys(lines).forEach(LineId => {
        if (LineId !== lineMove.id) {
          if (lines[LineId][0] === lines[lineMove.id][0] && lines[LineId][lines[LineId].length - 1] === lines[lineMove.id][lines[lineMove.id].length - 1]) {
            delete lines[LineId]
          } else {
            if (lines[LineId][0] === lines[lineMove.id][lines[lineMove.id].length - 1] && lines[LineId][lines[LineId].length - 1] === lines[lineMove.id][0]) {
              delete lines[LineId]
            }
          }
        }
      })
    }
  } else if (event.type === 'mousemove') {
    // another of position of line is equal to the position of mouse
    lines[lineMove.id][lines[lineMove.id].length - 1].x = mousePosition.x
    lines[lineMove.id][lines[lineMove.id].length - 1].y = mousePosition.y
  }
}

function addLine (lineId, that) {
  // The first point is the starting point
  // The end is the ending point
  that.lines[lineId] = [{ x: 0, y: 0 }, { x: 0, y: 0 }]
}
