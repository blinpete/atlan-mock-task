<script setup lang="ts">
import HomeView from './views/HomeView.vue'
</script>

<template>
  <header class="app-header">
    <h1>Atlan test</h1>
  </header>
  <HomeView />
</template>

<style scoped>
.app-header {
  /* disable margin collapse */
  border: 1px solid transparent;
}
</style>
