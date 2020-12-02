import SvgTool_ from '@/js/svgTool.js'
const SvgTool = new SvgTool_()

var mouseX = 0
var mouseY = 0

export default function touchSvg (event, that) {
  var svgMove = that.svgMove
  var itemMove = that.itemMove
  var lineMove = that.lineMove

  if (event.type === 'mousedown') {
    if (lineMove.isMove) {
      that.lines[lineMove.id][that.lines[lineMove.id].length - 1] = SvgTool.client2Svg(event)
      that.lines[lineMove.id].push(SvgTool.client2Svg(event))
    } else {
      // mousedown is meant already to move something
      svgMove.isMove = true

      // record mouse position when mousedown
      mouseX = event.offsetX
      mouseY = event.offsetY
    }
  } else if (event.type === 'mousemove') {
    // When move svg
    if (svgMove.isMove && !itemMove.isMove && !lineMove.isMove) {
      // The mouse is found to be released while moving, and the flag is closed
      if (!event.buttons) {
        svgMove.isMove = false
      } else {
      // difference between original mouse position and current mouse position (event.offsetX / event.offsetY)
      // Consider scale of svg, so use (svgMove.w / 600) and (svgMove.h / 300)
        svgMove.x += (mouseX - event.offsetX) * (svgMove.w / 600)
        svgMove.y += (mouseY - event.offsetY) * (svgMove.h / 300)

        // mouse position is event position now
        mouseX = event.offsetX
        mouseY = event.offsetY
      }
    }

    // When move item
    if (!svgMove.isMove && itemMove.isMove && !lineMove.isMove) {
      // The mouse is found to be released while moving, and the flag is closed
      if (!event.buttons) {
        itemMove.isMove = false
      } else {
        that.touchItem(event, itemMove.id)
      }
    }

    // // When move line
    if (!svgMove.isMove && !itemMove.isMove && lineMove.isMove) {
      that.touchPin(event, 'pin', lineMove.id)
    }
  } else if (event.type === 'mouseup') {
    svgMove.isMove = false
    itemMove.isMove = false
  } else if (event.type === 'mousewheel') {
    if (event.deltaY < 0) {
      // Scale Up
      svgMove.x -= event.offsetX * 0.1 * (svgMove.w / 600)
      svgMove.y -= event.offsetY * 0.1 * (svgMove.h / 300)
      svgMove.w *= 1.1
      svgMove.h *= 1.1
    } else {
      // Scale down
      svgMove.x += event.offsetX * 0.1 * (svgMove.w / 600)
      svgMove.y += event.offsetY * 0.1 * (svgMove.h / 300)
      svgMove.w /= 1.1
      svgMove.h /= 1.1
    }
  }
}
