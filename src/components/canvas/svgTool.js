export default class SvgTool {
  client2Svg (x, y) {
    const svg = document.getElementById('svg')
    const clientPoint = svg.createSVGPoint()
    const currentTransformMatrix = svg.getScreenCTM()

    clientPoint.x = x
    clientPoint.y = y

    // convert coordinate to svg coordinate
    const svgPoint = clientPoint.matrixTransform(currentTransformMatrix.inverse())

    function int (i) {
      // Decimal
      return parseInt(i, 10)
    }

    return { x: int(svgPoint.x.toFixed(0)), y: int(svgPoint.y.toFixed(0)) }
  }

  generateId () {
    let date = Date.now()

    if (
      typeof performance !== 'undefined' &&
      typeof performance.now === 'function'
    ) {
      date += performance.now() // use high-precision timer if available
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const regex = (date + Math.random() * 16) % 16 | 0

      date = Math.floor(date / 16)
      return (char === 'x' ? regex : (regex & 0x3) | 0x8).toString(16)
    })
  }

  updatePinsPosition (itemId, that) {
    // 更新物件的每個 pin 位置到 pins
    var pins = that.pins
    var items = that.items
    var rotateAng = items[itemId].position.rotate
    Array.from(Object.keys(pins[itemId])).forEach((key) => {
      var UnitVector = this.calculateUnitVector({ x: 0, y: 0 }, { x: pins[itemId][key].relativeCoordinate.cx, y: pins[itemId][key].relativeCoordinate.cy })
      pins[itemId][key].svgCoordinate.x =
        items[itemId].position.transformX + (UnitVector.unit * Math.cos((UnitVector.ang + rotateAng) * (3.14159 / 180)))
      pins[itemId][key].svgCoordinate.y =
        items[itemId].position.transformY + (UnitVector.unit * Math.sin((UnitVector.ang + rotateAng) * (3.14159 / 180)))
    })
  }

  calculateUnitVector (a, b) {
    // Calculate unit vector and angle
    var unit = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
    var X = (a.x - b.x) / unit
    var Y = (a.y - b.y) / unit
    var ang = 0
    if (X > 0) {
      if (Y > 0) { ang = 180 - Math.atan(Y / X) * (180 / 3.141596) } else { ang = 180 - Math.atan(Y / X) * (180 / 3.141596) }
    } else {
      if (Y > 0) { ang = -Math.atan(Y / X) * (180 / 3.141596) } else { ang = 360 - Math.atan(Y / X) * (180 / 3.141596) }
    }
    if (Y / X === -Infinity) ang = 270
    if (Y / X === Infinity) ang = 90
    return { unit: unit, x: X, y: Y, ang: 360 - ang }
  }
}
