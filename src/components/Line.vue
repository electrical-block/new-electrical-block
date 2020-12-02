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
    return {
    }
  },
  methods: {
    d (line) {
      var d = 'M ' + line[0].x + ' ' + line[0].y + ' '
      for (var i = 1; i < line.length; i++) {
        d = d + 'L ' + line[i].x + ' ' + line[i].y + ' '
      }
      return d
    }
  }
}
</script>

<style scoped>
</style>
