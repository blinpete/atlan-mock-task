<script setup lang="ts">
import HomeView from './views/HomeView.vue'
import Metadata from './components/Metadata.vue'
</script>

<template>
  <HomeView />
  <Metadata />
</template>

<style scoped>
.app-header {
  /* disable margin collapse */
  border: 1px solid transparent;
}

.metadata {
  position: absolute;
  top: 0.5em;
  right: 0;
}
</style>
