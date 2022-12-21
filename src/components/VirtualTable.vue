<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useVirtualList, useIntersectionObserver } from '@vueuse/core'

type Item = { id: string } & Record<string, any>

const props = withDefaults(
  defineProps<{
    items: Item[]
    keys: string[]
    trackBottom?: boolean
    // exhausted: boolean
  }>(),
  { trackBottom: true }
)

const emit = defineEmits<{
  (event: 'reach-end'): void
}>()

const reactiveItems = computed(() => props.items)

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(reactiveItems, {
  itemHeight: 30,
  overscan: 2,
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

// const handleScrollTo = () => {
//   scrollTo(index.value)
// }
</script>

<template>
  <div class="table">
    <div class="thead">
      <div class="th" v-for="key in keys" :key="key">{{ key }}</div>
    </div>
    <div class="tbody">
      <div v-bind="containerProps" class="vlist h-300px overflow-auto p-2 bg-gray-500/5 rounded">
        <div v-bind="wrapperProps">
          <div
            v-for="{ index, data } in list"
            :key="index"
            class="row border border-$c-divider mb-2"
            :style="{
              height: `${data.height}px`,
              justifyContent: 'center',
              alignItems: 'center',
            }"
          >
            <div class="td" v-for="key in keys" :key="key">{{ data[key] }}</div>
          </div>

          <!-- visibility observer -->
          <div class="bottom">
            <div class="bottom__observer" ref="bottomRef"></div>
            <slot name="bottom" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bottom {
  background-color: antiquewhite;
  padding: 1em;
}

.table {
  border: 2px solid black;
  margin: 1em 1em;
}

.thead,
.row {
  border-bottom: 2px solid darkgrey;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.thead {
  background: #333;
  color: #eee;
  font-weight: bold;
}

.thead .th {
  padding-top: 0.4em;
  padding-bottom: 0.4em;
}

.tbody .vlist {
  height: 60vh;
  overflow: auto;
}

.th,
.td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.2em;
}

:is(.th, .td):not(:first-child) {
  border-left: 2px solid darkgrey;
}
</style>
