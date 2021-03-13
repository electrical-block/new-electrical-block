import SvgTool from '@/js/svgTool.js'
const SvgTool_ = new SvgTool()

export default function addItem (itemName, that, CPUS) {
  const id = SvgTool_.generateId()
  // add item to Canvas.items
  that.items[id] = {
    name: itemName,
    position: {
      transformX: 200,
      transformY: 30,
      rotate: 0
    },
    class: 'item-off',
    data: {}
  }
  // defined data={}
  switch (itemName) {
    case 'arduinoUno':
      CPUS[id] = {}
      that.monacoEditors[id] = {
        statusLabel: 'hi',
        options: {
        },
        code: `void setup() {
          // initialize digital pin LED_BUILTIN as an output.
          pinMode(13, OUTPUT);
        }

        // the loop function runs over and over again forever
        void loop() {
          digitalWrite(13, HIGH);   // turn the LED on (HIGH is the voltage level)
          delay(50);                       // wait for a second
          digitalWrite(13, LOW);    // turn the LED off by making the voltage LOW
          delay(50);                       // wait for a second
        }`,
        editor: []
      }
      break
    case 'sawtoothWave':
      that.items[id].data.frequency = 0
      break
    case 'monitor':
      that.items[id].data.voltage = 0
      break
  }
  // add event
  addItemPins(itemName, id, that)
  return id
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
