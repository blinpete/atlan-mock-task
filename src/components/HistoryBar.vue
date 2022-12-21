<template>
  <div class="HistoryBar">
    <h1 class="title">History</h1>
    <ul class="list">
      <li
        class="entry"
        v-for="[key, { items, lengthTotal }] in storeHistory.history"
        :key="key"
        @click="() => storeHistory.setQuery(key)"
      >
        <div class="query">{{ key }} ({{ items.length }} / {{ lengthTotal }})</div>
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
  background-color: hsl(242deg 80% 38%);
  color: #ddf;
}

.title {
  font-weight: 800;
  text-align: center;
  margin-top: 2rem;
}

.list {
  list-style: none;
  padding: 0.5em;

  display: flex;
  flex-direction: column-reverse;
  gap: 0.25em;
}

.entry {
  display: flex;
  gap: 0.2em;
}

.query {
  max-height: 4em;
  overflow: hidden;
}

.query,
.btn-icon {
  cursor: pointer;
  padding: 0.15em 0.4em;

  border-radius: 0.25em;
  background-color: hsl(242deg 46% 50%);
}
.query {
  flex: 1 1 auto;
  font-weight: 500;
}

.btn-icon {
  border: none;
  font-weight: 700;
  color: currentColor;
  cursor: pointer;
}

.query:hover,
.btn-icon:hover {
  opacity: 0.7;
}
</style>
