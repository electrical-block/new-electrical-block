var mouseX = 0
var mouseY = 0

export default function touchSvg (event, that) {
  var svg = that.svg
  var itemMove = that.itemMove
  var lineMove = that.lineMove

  if (event.type === 'mousedown') {
    // mousedown is meant already to move something
    svg.isMove = true

    // record mouse position when mousedown
    mouseX = event.offsetX
    mouseY = event.offsetY
  } else if (event.type === 'mousemove') {
    // When move svg
    if (svg.isMove && !itemMove.isMove && !lineMove.isMove) {
      // difference between original mouse position and current mouse position (event.offsetX / event.offsetY)
      // Consider scale of svg, so use (svg.w / 600) and (svg.h / 300)
      svg.x += (mouseX - event.offsetX) * (svg.w / 600)
      svg.y += (mouseY - event.offsetY) * (svg.h / 300)

      // mouse position is event position now
      mouseX = event.offsetX
      mouseY = event.offsetY
    }

    // When move item
    if (!svg.isMove && itemMove.isMove && !lineMove.isMove) {
      that.touchItem(event, itemMove.id)
    }

    // // When move line
    if (!svg.isMove && !itemMove.isMove && lineMove.isMove) {
      that.touchPin(event, 'pin', lineMove.id)
    }
  } else if (event.type === 'mouseup') {
    svg.isMove = false
    itemMove.isMove = false
  } else if (event.type === 'mousewheel') {
    if (event.deltaY < 0) {
      // Scale Up
      svg.x -= svg.y * 0.05
      svg.y -= svg.h * 0.05
      svg.w *= 1.1
      svg.h *= 1.1
    } else {
      // Scale down
      svg.x += svg.w * 0.1
      svg.y += svg.h * 0.1
      svg.w /= 1.1
      svg.h /= 1.1
    }
  }
}
