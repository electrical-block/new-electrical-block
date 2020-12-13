import SvgTool from '@/js/svgTool.js'
const SvgTool_ = new SvgTool()

export default function addItem (itemName, that) {
  const id = SvgTool_.generateId()

  // add item to Canvas.items
  that.items[id] = {
    name: itemName,
    position: {
      transformX: 200,
      transformY: 30
    },
    class: 'item-off'
  }

  addItemPins(itemName, id, that)
}

function addItemPins (itemName, id, that) {
  let pinPosition = {}

  switch (itemName) {
    case 'Resistor':
      pinPosition = [
        { svgCoordinate: { x: 0, y: 0 }, relativeCoordinate: { cx: 0, cy: -15 } },
        { svgCoordinate: { x: 0, y: 10 }, relativeCoordinate: { cx: 0, cy: 15 } }
      ]
      break
    case 'Led':
      pinPosition = [
        { svgCoordinate: { x: 0, y: 0 }, relativeCoordinate: { cx: 3, cy: -3 } },
        { svgCoordinate: { x: 0, y: 10 }, relativeCoordinate: { cx: -5, cy: -3 } }
      ]
      break
    default:
      break
  }

  that.pins[id] = pinPosition
  SvgTool_.updatePinsPosition(id, that)
}
