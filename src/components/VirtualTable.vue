<template>
  <div class="table" ref="tableRef">
    <div class="thead" :style="{ gridTemplateColumns: gridColumnsStyle }">
      <div class="th" v-for="key in keys" :key="key">{{ key }}</div>
    </div>
    <div class="tbody">
      <div v-bind="containerProps" class="vlist">
        <div v-bind="wrapperProps">
          <div
            v-for="{ index, data } in list"
            :key="index"
            class="row"
            :style="{
              height: `${data.height}px`,
              gridTemplateColumns: gridColumnsStyle,
            }"
          >
            <div class="td" v-for="key in keys" :key="key">{{ data[key] }}</div>
          </div>

          <!-- visibility observer -->
          <div class="bottom" v-if="!exhausted">
            <div class="bottom__observer" ref="bottomRef"></div>
            <slot name="bottom" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useVirtualList, useIntersectionObserver, useResizeObserver } from '@vueuse/core'

type Item = { id: string } & Record<string, any>

const props = withDefaults(
  defineProps<{
    items: Item[]
    keys: string[]
    trackBottom?: boolean
    exhausted: boolean
  }>(),
  { trackBottom: true }
)

const emit = defineEmits<{
  (event: 'reach-end'): void
}>()

const reactiveItems = computed(() => props.items)

watch(reactiveItems, (next, prev) => {
  console.log('🚀 | watch | reactiveItems')
  scrollTo(0)
})

const vlistWidth = ref(visualViewport?.width! * 0.7)

const tableRef = ref(null)
useResizeObserver(tableRef, entries => {
  const entry = entries[0]
  if (!entry) return

  vlistWidth.value = entry.contentRect.width
})

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(reactiveItems, {
  itemHeight: 30,
  overscan: 10,
})

const bottomRef = ref(null)

if (props.trackBottom) {
  console.log('🚀 | trackBottom', props.trackBottom)

  const bottomIsVisible = ref(false)
  const { stop } = useIntersectionObserver(bottomRef, ([{ isIntersecting }]) => {
    bottomIsVisible.value = isIntersecting
  })

  watch(bottomIsVisible, (next, prev) => {
    console.log('🚀 | watch | next', next)

    if (next === true && prev === false) {
      emit('reach-end')
    }
  })
}

const gridColumnsStyle = computed(() => {
  console.log('🚀 | gridColumnsStyle | width', vlistWidth.value)

  let w = vlistWidth.value / props.keys.length
  console.log('🚀 | gridColumnsStyle | w', w)

  if (w < 100) return `repeat(${props.keys.length}, 100px)`

  return `repeat(${props.keys.length}, 1fr)`
})
</script>

<style>
.bottom {
  padding: 1em;
}

.table {
  border: 2px solid black;
  display: flex;
  flex-direction: column;

  height: min-content;

  overflow-x: auto;
}
.thead {
  flex: 0 0 auto;
}
.tbody {
  flex: 1 1 auto;
}

.thead,
.tbody {
  min-width: fit-content;
}

.thead,
.row {
  display: grid;
}

.row:not(:last-child) {
  border-bottom: 1.5px solid darkgrey;
}

.thead {
  background: #333;
  color: #eee;
  font-weight: bold;
}

.thead .th {
  --pad: 0.5em;
  padding-top: var(--pad);
  padding-bottom: var(--pad);
}

.vlist {
  height: 70vh;
}

.th,
.td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.2em;
}

/* :is(.th, .td):not(:first-child) {
  border-left: 2px solid darkgrey;
} */
</style>
