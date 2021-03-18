<template>
  <div>
    <div
      v-show="!isCollapse"
      class="fixed bottom-0 right-0 bg-gray-100"
      style="min-width: 300px; height: calc(100% - 60px)"
    >
      <div class="my-6">
        Search 欄位
      </div>
      <div class="grid grid-flow-row grid-cols-2 gap-4">
        <div
          v-for="(item, index) in items"
          :key="`image-${index}`"
          class="mx-auto my-auto"
        >
          <img
            :src="item.path"
            draggable="true"
            width="50"
            height="50"
            @dragstart="setData($event, item.name)"
          >
        </div>
      </div>
    </div>
    <div
      :class="{ 'fixed icon': true, 'bg-gray-100': !isCollapse, 'bg-gray-200': isCollapse }"
      :style="{right: isCollapse ? '0px' : '286px'}"
      @click="checkCollapse"
    >
      <div>
        <img
          v-if="!isCollapse"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyLjAwMiA1MTIuMDAyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIuMDAyIDUxMi4wMDI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMzg4LjQyNSwyNDEuOTUxTDE1MS42MDksNS43OWMtNy43NTktNy43MzMtMjAuMzIxLTcuNzItMjguMDY3LDAuMDRjLTcuNzQsNy43NTktNy43MiwyMC4zMjgsMC4wNCwyOC4wNjdsMjIyLjcyLDIyMi4xMDUNCgkJCUwxMjMuNTc0LDQ3OC4xMDZjLTcuNzU5LDcuNzQtNy43NzksMjAuMzAxLTAuMDQsMjguMDYxYzMuODgzLDMuODksOC45Nyw1LjgzNSwxNC4wNTcsNS44MzVjNS4wNzQsMCwxMC4xNDEtMS45MzIsMTQuMDE3LTUuNzk1DQoJCQlsMjM2LjgxNy0yMzYuMTU1YzMuNzM3LTMuNzE4LDUuODM0LTguNzc4LDUuODM0LTE0LjA1UzM5Mi4xNTYsMjQ1LjY3NiwzODguNDI1LDI0MS45NTF6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo="
        >
        <img
          v-if="isCollapse"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDQzLjUyIDQ0My41MiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQzLjUyIDQ0My41MjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0xNDMuNDkyLDIyMS44NjNMMzM2LjIyNiwyOS4xMjljNi42NjMtNi42NjQsNi42NjMtMTcuNDY4LDAtMjQuMTMyYy02LjY2NS02LjY2Mi0xNy40NjgtNi42NjItMjQuMTMyLDBsLTIwNC44LDIwNC44DQoJCQljLTYuNjYyLDYuNjY0LTYuNjYyLDE3LjQ2OCwwLDI0LjEzMmwyMDQuOCwyMDQuOGM2Ljc4LDYuNTQ4LDE3LjU4NCw2LjM2LDI0LjEzMi0wLjQyYzYuMzg3LTYuNjE0LDYuMzg3LTE3LjA5OSwwLTIzLjcxMg0KCQkJTDE0My40OTIsMjIxLjg2M3oiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['collapse-item-table'],
  data () {
    return {
      items: {},
      isCollapse: false
    }
  },
  created () {
    const itemDescription = require('@/json/itemDescription.json')
    Object.keys(itemDescription).forEach((key) => {
      this.items[key] = {
        path: require('@/assets/' + key + '.png'),
        name: key
      }
    })
  },
  methods: {
    setData (event, itemName) {
      event.dataTransfer.setData('item-name', itemName)
    },
    checkCollapse () {
      this.isCollapse = !this.isCollapse
      this.$emit('collapse-item-table', this.isCollapse)
    }
  }
}
</script>

<style scoped>
.icon {
  width: 30px;
  border-radius: 50%;
  padding: 5px;
  top: calc(50% + 30px);
}
</style>
