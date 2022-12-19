<script setup lang="ts">
import { ApiClient } from '@/api'
import { ApiError } from '@/api/error'
import type { API, Post } from '@/api/types'
import { ref } from 'vue'
import VirtualTable from '../components/VirtualTable.vue'
import BaseSpinner from '../components/BaseSpinner.vue'

const query = ref('')
const error = ref<ApiError | null>(null)
const posts = ref<Post[] | null>(null)

const keys = ref<(keyof Post)[]>([])

async function onSubmit(e: Event) {
  const se = e as SubmitEvent
  console.log('🚀 | onSubmit | e', se)
  console.log('🚀 | onSubmit | query', query.value)

  if (!query.value) {
    return
  }

  error.value = null

  const response = await ApiClient.getPosts({ query: query.value, limit: 40 })
  console.log('🚀 | onSubmit | response', response)

  if (response instanceof ApiError) {
    error.value = response
  } else {
    posts.value = response.data
    keys.value = response.keys
  }
}

async function loadChunk() {
  if (posts.value && posts.value.length) {
    const lastPost = posts.value[posts.value.length - 1]

    const response = await ApiClient.getPosts({ query: query.value, from: lastPost.id, limit: 40 })
    console.log('🚀 | onSubmit | response', response)

    if (response instanceof ApiError) {
      error.value = response
    } else {
      posts.value.push(...response.data)

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

    <VirtualTable v-if="posts?.length" :items="posts" :keys="keys" @reach-end="loadChunk">
      <template #bottom>
        <BaseSpinner />
      </template>
    </VirtualTable>
    <div v-else>No results for your query</div>
  </main>
</template>
