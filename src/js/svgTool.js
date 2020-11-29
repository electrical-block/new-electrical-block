export default class SvgTool {
  client2Svg (event) {
    const svg = document.getElementById('svg')
    const clientPoint = svg.createSVGPoint()
    const currentTransformMatrix = svg.getScreenCTM()

    clientPoint.x = event.clientX
    clientPoint.y = event.clientY

    // convert coordinate to svg coordinate
    const svgPoint = clientPoint.matrixTransform(currentTransformMatrix.inverse())

    function int (i) {
      // Decimal
      return parseInt(i, 10)
    }

    return { x: int(svgPoint.x.toFixed(0)), y: int(svgPoint.y.toFixed(0)) }
  }

  generateUserId () {
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
    Array.from(Object.keys(pins[itemId])).forEach((key) => {
      pins[itemId][key].svgCoordinate.x =
        items[itemId].position.transformX + pins[itemId][key].relativeCoordinate.cx

      pins[itemId][key].svgCoordinate.y =
        items[itemId].position.transformY + pins[itemId][key].relativeCoordinate.cy
    })
  }
}
