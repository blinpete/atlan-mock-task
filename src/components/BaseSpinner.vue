<!-- based on: https://codepen.io/supah/pen/BjYLdW -->
<template>
  <div class="BaseSpinner" :style="{ height: spinnerStyle.width }">
    <svg class="spinner" :style="spinnerStyle" viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: Number,
    default: 20,
  },
})

const spinnerStyle = {
  width: props.width + 'px',
  marginTop: -props.width / 2 + 'px',
  marginLeft: '',
}
spinnerStyle.marginLeft = spinnerStyle.marginTop
</script>

<style scoped>
.BaseSpinner {
  position: relative;
  overflow: hidden;
}

.spinner {
  animation: rotate 1.6s linear infinite;

  position: absolute;
  top: 50%;
  left: 50%;
}

.path {
  stroke: green;
  stroke-linecap: round;
  animation: dash 1.2s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
