import SvgTool from '@/js/svgTool.js'
const SvgTool_ = new SvgTool()

export default function addItem (itemName, that) {
  const id = SvgTool_.generateId()

  // add item to Canvas.items
  that.items[id] = {
    name: itemName,
    position: {
      transformX: 200,
      transformY: 30,
      rotate: 0
    },
    class: 'item-off'
  }
  addItemPins(itemName, id, that)
}

function addItemPins (itemName, id, that) {
  var itemDescription = require('@/json/itemDescription.json')
  const pinPosition = []
  itemDescription[itemName].pins.forEach(pin => {
    pinPosition.push({ svgCoordinate: { x: 0, y: 0 }, relativeCoordinate: { cx: pin.cx, cy: pin.cy } })
  })
  that.pins[id] = pinPosition
  SvgTool_.updatePinsPosition(id, that)
}
