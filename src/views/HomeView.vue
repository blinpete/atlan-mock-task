<script setup lang="ts">
import { ApiClient } from '@/api'
import { ApiError } from '@/api/error'
import { ref, computed } from 'vue'
import VirtualTable from '../components/VirtualTable.vue'
import BaseSpinner from '../components/BaseSpinner.vue'
import HistoryBar from '../components/HistoryBar.vue'
import { useStoreHistory } from '@/stores/history'
import { storeToRefs } from 'pinia'

const error = ref<ApiError | null>(null)

const { query, items, keys, lengthTotal } = storeToRefs(useStoreHistory())
const { saveQuery } = useStoreHistory()

const exhausted = computed(() => items.value.length === lengthTotal.value)

async function onSubmit(e: Event) {
  const se = e as SubmitEvent
  console.log('🚀 | onSubmit | e', se)
  console.log('🚀 | onSubmit | query', query.value)

  if (!query.value) {
    return
  }

  error.value = null

  const response = await ApiClient.getData({ query: query.value, limit: 40 })
  console.log('🚀 | onSubmit | response', response)

  if (response instanceof ApiError) {
    error.value = response
  } else {
    items.value = response.data
    keys.value = response.keys
    lengthTotal.value = response.length
    saveQuery()
  }
}

async function loadChunk() {
  if (items.value && items.value.length) {
    const lastPost = items.value[items.value.length - 1]

    const response = await ApiClient.getData({ query: query.value, from: lastPost.id, limit: 40 })
    console.log('🚀 | onSubmit | response', response)

    if (response instanceof ApiError) {
      error.value = response
    } else {
      items.value.push(...response.data)

      if (response.keys.length) {
        keys.value = response.keys
      }
    }
  }
}
</script>

<template>
  <main class="main-layout">
    <HistoryBar />

    <form class="form" @submit.prevent="onSubmit">
      <label>
        <span>SQL query</span>
        <input type="text" v-model.trim="query" required />
      </label>

      <button type="submit">Run</button>
    </form>

    <VirtualTable
      v-if="items?.length"
      :items="items"
      :keys="keys"
      :exhausted="exhausted"
      @reach-end="loadChunk"
    >
      <template #bottom>
        <BaseSpinner />
      </template>
    </VirtualTable>
    <div v-else>No results for your query</div>
  </main>
</template>

<style>
.main-layout {
  display: grid;
  grid-template-columns: 12em auto;
  gap: 1em;
}
.HistoryBar {
  grid-column: 1;
  grid-row: span 2;
}

.form,
.table {
  grid-column: 2;
}

.table {
  grid-row: 2;
}
</style>
