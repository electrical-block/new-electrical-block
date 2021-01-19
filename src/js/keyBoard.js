import SvgTool from '@/js/svgTool.js'
const SvgTool_ = new SvgTool()

export default function keyBoard (event, than) {
  if (event.key === ' ' && than.itemMove.isMove) {
    // item rotation
    than.items[than.itemMove.id].position.rotate += (360 / 8)
    var mousePosition = { x: than.items[than.itemMove.id].position.transformX + than.itemMove.dx, y: than.items[than.itemMove.id].position.transformY + than.itemMove.dy }
    var unitVector = SvgTool_.calculateUnitVector({ x: 0, y: 0 }, { x: than.itemMove.dx, y: than.itemMove.dy })
    unitVector.ang += (360 / 8)
    than.itemMove.dx = unitVector.unit * Math.cos((3.1415 / 180) * unitVector.ang)
    than.itemMove.dy = unitVector.unit * Math.sin((3.1415 / 180) * unitVector.ang)
    than.items[than.itemMove.id].position.transformX = mousePosition.x - than.itemMove.dx
    than.items[than.itemMove.id].position.transformY = mousePosition.y - than.itemMove.dy
    SvgTool_.updatePinsPosition(than.itemMove.id, than)
  }
}
