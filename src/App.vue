<script setup lang="ts">
import HomeView from './views/HomeView.vue'
</script>

<template>
  <!-- <header class="app-header">
    <h1>Atlan test</h1>
  </header> -->
  <HomeView />
  <div class="metadata">links</div>
</template>

<style scoped>
.app-header {
  /* disable margin collapse */
  border: 1px solid transparent;
}

.metadata {
  position: absolute;
  top: 1em;
  right: 0;

  background-color: #222;
  color: #eee;
}
</style>
