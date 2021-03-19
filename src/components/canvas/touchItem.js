import SvgTool from './svgTool.js'
const SvgTool_ = new SvgTool()

export default function touchItem (event, itemId, than) {
  event.stopPropagation()
  // get mouse position in svg coordinate
  const mousePosition = SvgTool_.client2Svg(event.clientX, event.clientY)
  var itemMove = than.itemMove
  var items = than.items
  var pins = than.pins
  if (event.type === 'mousedown') {
    itemMove.isMove = true

    // Item lights 'up' and 'off'
    // Close the previous
    if (itemMove.id !== null) items[itemMove.id].class = 'item-off'
    // Open this item
    items[itemId].class = 'item-on'

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
    SvgTool_.updatePinsPosition(itemId, than)

    // If the magnetic force triggers it will draw the object
    const a = []
    Object.keys(pins).forEach(Id => {
      if (Id !== itemId) {
        pins[Id].forEach(pin => {
          a.push([pin.svgCoordinate.x, pin.svgCoordinate.y])
        })
      }
    })
    pins[itemMove.id].forEach(pin => {
      a.forEach(aPin => {
        if (calculateVectorLen(pin.svgCoordinate, { x: aPin[0], y: aPin[1] }) < 8) {
          var UnitVector = SvgTool_.calculateUnitVector({ x: 0, y: 0 }, { x: pin.relativeCoordinate.cx, y: pin.relativeCoordinate.cy })
          var rotateAng = items[itemId].position.rotate
          UnitVector.ang += rotateAng
          items[itemId].position.transformX = aPin[0] - (UnitVector.unit * Math.cos((UnitVector.ang) * (3.14159 / 180)))
          items[itemId].position.transformY = aPin[1] - (UnitVector.unit * Math.sin((UnitVector.ang) * (3.14159 / 180)))
          SvgTool_.updatePinsPosition(itemId, than)
        }
      })
    })
  }
}
function calculateVectorLen (a, b) {
  // Calculate length
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}
