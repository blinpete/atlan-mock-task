<template>
  <main class="main-layout">
    <HistoryBar />

    <form class="form" @submit.prevent="onSubmit">
      <label class="input-wrapper">
        <span class="label">SQL query</span>
        <input class="input" type="text" v-model.trim="query" required />
      </label>

      <button class="btn" type="submit">Run</button>
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
    <div class="fallback" v-else>No results for your query</div>
  </main>
</template>

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

<style>
.main-layout {
  height: 100%;

  display: grid;
  grid-template-columns: 15em auto;
  grid-template-rows: min-content 1fr;
  gap: 1em;
}
.HistoryBar {
  grid-column: 1;
  grid-row: span 2;
}

.form,
.table,
.fallback {
  grid-column: 2;
  margin: 1em 1em;
}

.fallback {
  color: hsla(0deg 0% 20% / 0.7);
  font-weight: 500;

  display: flex;
  justify-content: center;
  align-items: center;
}

.table {
  grid-row: 2;
  margin-top: 0;
  /* margin-bottom: 2em; */
}

.form {
  display: flex;
  flex-direction: row;
  gap: 0.2em;
  height: min-content;
  margin-top: 1.5rem;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
}
.label {
  font-weight: 600;
}

.input {
  min-width: 20em;
}

.input,
.btn {
  padding: 0.2em;
  font-weight: 400;
}

.btn {
  align-self: end;
  background-color: hsl(120deg 35% 45%);
  border-color: transparent;
  box-shadow: none;

  border-radius: 0.2em;
  color: #eee;

  --pad: 0.5em;
  padding-left: var(--pad);
  padding-right: var(--pad);
  cursor: pointer;
  font-weight: 500;
}
.btn:hover {
  opacity: 0.85;
}
</style>
