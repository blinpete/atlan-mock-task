<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <h1>Atlan test</h1>
  </header>
  <RouterView />
</template>

<style scoped>
.app-header {
  /* disable margin collapse */
  border: 1px solid transparent;
}
</style>
