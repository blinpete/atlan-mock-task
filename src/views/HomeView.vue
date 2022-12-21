<script setup lang="ts">
import { ApiClient } from '@/api'
import { ApiError } from '@/api/error'
import type { Item } from '@/api/types'
import { ref } from 'vue'
import VirtualTable from '../components/VirtualTable.vue'
import BaseSpinner from '../components/BaseSpinner.vue'

const query = ref('')
const error = ref<ApiError | null>(null)
const items = ref<Item[] | null>(null)

const keys = ref<(keyof Item)[]>([])

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
  <main>
    <form @submit.prevent="onSubmit">
      <label>
        <span>SQL query</span>
        <input type="text" v-model.trim="query" required />
      </label>

      <button type="submit">Run</button>
    </form>

    <VirtualTable v-if="items?.length" :items="items" :keys="keys" @reach-end="loadChunk">
      <template #bottom>
        <BaseSpinner />
      </template>
    </VirtualTable>
    <div v-else>No results for your query</div>
  </main>
</template>
