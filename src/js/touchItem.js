import SvgTool from '@/js/svgTool.js'
const SvgTool_ = new SvgTool()

export default function touchItem (event, itemId, that) {
  event.stopPropagation()

  // get mouse position in svg coordinate
  const mousePosition = SvgTool_.client2Svg(event)
  var itemMove = that.itemMove
  var items = that.items

  if (event.type === 'mousedown') {
    itemMove.isMove = true
    itemMove.id = itemId

    const itemPosition = {
      x: items[itemId].position.transformX,
      y: items[itemId].position.transformY
    }

    // record difference between mouse and item position
    itemMove.dx = mousePosition.x - itemPosition.x
    itemMove.dy = mousePosition.y - itemPosition.y
  } else if (event.type === 'mousemove') {
    // calculate the transform coordinate of item
    items[itemId].position.transformX = mousePosition.x - itemMove.dx
    items[itemId].position.transformY = mousePosition.y - itemMove.dy
    SvgTool_.updatePinsPosition(itemId, that)
  }
}
