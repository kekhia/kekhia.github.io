<template>
  <div>
    <div v-if="percentage" class="loading-bar">
      <div class="percentage" :style="{ width: percentage + '%' }">{{ percent }}%</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  niveau: {
    type: [Number, String],
    required: true,
  },
})

const percentage = ref(0)
let intervalId = null

const percent = computed(() => percentage.value.toFixed())

function startAnimation() {
  percentage.value = 0
  intervalId = setInterval(() => {
    if (percentage.value < Number(props.niveau)) {
      percentage.value += 0.5
    } else {
      clearInterval(intervalId)
      intervalId = null
    }
  }, 10)
}

onMounted(() => {
  startAnimation()
})

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

watch(() => props.niveau, () => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  startAnimation()
})
</script>