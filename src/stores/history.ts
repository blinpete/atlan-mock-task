import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Item } from '@/api/types'

export const useStoreHistory = defineStore('history', () => {
  const history = ref(new Map<string, {keys: string[]; items: Item[]; lengthTotal: number}>())

  const query = ref('')
  const items = ref<Item[]>([])
  const keys = ref<string[]>([])
  const lengthTotal = ref(0)

  function setQuery(q: string) {
    query.value = q

    const cached = history.value.get(q)

    if (cached) {
      items.value = cached.items
      keys.value = cached.keys
      lengthTotal.value = cached.lengthTotal
    }
  }

  function saveQuery() {
    history.value.set(query.value, {
      keys: keys.value,
      items: items.value,
      lengthTotal: lengthTotal.value
    })
  }

  function resetQuery() {
    query.value = ''
    items.value = []
    lengthTotal.value = 0
  }

  function dropCache(q: string) {
    if (query.value === q) {
      resetQuery()
    }

    return history.value.delete(q)
  }

  return { query, items, keys, lengthTotal, history, saveQuery, setQuery, resetQuery, dropCache }
})
