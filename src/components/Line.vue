<template>
  <path
    :id="index"
    :d="d(line)"
    stroke="#7cfc00"
    fill="none"
    stroke-width="5"
  />
</template>

<script>
export default {
  props: {
    index: {
      type: String,
      required: true
    },
    line: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    d (line) {
      // https://i.imgur.com/ab4ywFf.png (示意圖)
      var a = 20
      var d = 'M ' + line[0].x + ' ' + line[0].y
      var minShrinkLength = this.vectorLen(line[0], line[1])
      // Calculate the intermediate turn segment
      for (var i = 1; i < line.length - 1; i++) {
        // If this point is repeated with the next point, don't do this point
        if (line[i].x !== line[i + 1].x || line[i].y !== line[i + 1].y) {
          var one = line[i - 1]
          var two = line[i]
          var three = line[i + 1]

          // Minimum shrink length
          a = Math.min(this.vectorLen(three, two), this.vectorLen(one, two), a)

          // Calculation sweep_flag && ang(two line between)
          var sweepFlag = 0
          var ang = this.unitVector(two, three).ang - this.unitVector(two, one).ang
          if (ang > 0) {
            sweepFlag = 1
          } else {
            sweepFlag = 0
          }
          ang = Math.abs(ang)
          if (ang > 180) {
            ang = 360 - ang
            if (sweepFlag) { sweepFlag = 0 } else { sweepFlag = 1 }
          }

          // Calculation b && r length
          var b = Math.min(a * Math.cos(ang * 0.5 * (3.1415926 / 180)), minShrinkLength)
          var r = a * Math.sin(ang * 0.5 * (3.1415926 / 180))

          // (第二個點 - b * 單位向量) 找出 x4 y4 x5 y5
          var x4 = two.x - b * this.unitVector(two, one).x
          var y4 = two.y - b * this.unitVector(two, one).y
          var x5 = two.x - b * this.unitVector(two, three).x
          var y5 = two.y - b * this.unitVector(two, three).y

          // Ready for next time
          minShrinkLength = this.vectorLen({ x: x5, y: y5 }, three)
          d = d + ' L ' + x4 + ' ' + y4 + ' A ' + r + ' ' + r + ' 0 0 ' + sweepFlag + ' ' + x5 + ' ' + y5
        }
      }

      // End instruction
      d = d + ' L ' + line[line.length - 1].x + ' ' + line[line.length - 1].y
      return d
    },
    unitVector (a, b) {
      // Calculate unit vector and angle
      var unit = this.vectorLen(a, b)
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
      return { x: X, y: Y, ang: ang }
    },
    vectorLen (a, b) {
      // Calculate length
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
    }
  }
}
</script>

<style scoped>
</style>
