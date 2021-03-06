import {
  avrInstruction,
  AVRTimer,
  CPU,
  timer0Config,
  AVRIOPort,
  portBConfig,
  portCConfig,
  portDConfig
} from 'avr8js'

// ATmega328p params
const FLASH = 0x8000

export class AVRRunner {
  constructor (hex) {
    this.id = ''
    this.program = new Uint16Array(FLASH)
    this.stopped = false
    loadHex(hex, new Uint8Array(this.program.buffer))
    this.cpu = new CPU(this.program)
    this.timer = new AVRTimer(this.cpu, timer0Config)
    this.portB = new AVRIOPort(this.cpu, portBConfig)
    this.portC = new AVRIOPort(this.cpu, portCConfig)
    this.portD = new AVRIOPort(this.cpu, portDConfig)
  }

  async execute (callback) {
    this.stopped = false
    for (; ;) {
      avrInstruction(this.cpu)
      this.cpu.tick()
      if (this.cpu.cycles % 50000 === 0) {
        callback(this.cpu)
        await new Promise(resolve => setTimeout(resolve, 0))
        if (this.stopped) {
          break
        }
      }
    }
  }

  stop () {
    this.stopped = true
  }
}
function loadHex (source, target) {
  for (const line of source.split('\n')) {
    if (line[0] === ':' && line.substr(7, 2) === '00') {
      const bytes = parseInt(line.substr(1, 2), 16)
      const addr = parseInt(line.substr(3, 4), 16)
      for (let i = 0; i < bytes; i++) {
        target[addr + i] = parseInt(line.substr(9 + i * 2, 2), 16)
      }
    }
  }
}
