<template>
  <div class="HistoryBar">
    <ul class="list">
      <li
        class="entry"
        v-for="[key, { items, lengthTotal }] in storeHistory.history"
        :key="key"
        @click="() => storeHistory.setQuery(key)"
      >
        <span> {{ key }} ({{ items.length }} / {{ lengthTotal }}) </span>
        <button class="btn-icon" @click.stop="() => storeHistory.dropCache(key)">&times;</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useStoreHistory } from '@/stores/history'

const storeHistory = useStoreHistory()
</script>

<style scoped>
.HistoryBar {
  background-color: bisque;
}

.list {
  list-style: none;
  padding: 0.3em;

  display: flex;
  flex-direction: column-reverse;
  gap: 0.1em;
}

.entry {
  background-color: burlywood;
  padding: 0.15em 0.4em;
  border-radius: 0.25em;
  cursor: pointer;
}
.entry:hover {
  opacity: 0.7;
}
</style>
