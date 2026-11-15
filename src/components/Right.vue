<template>
  <div class="twothird">
    <div class="container white card margin-bottom" :style="imgSectionStyle">
      <RightData :data="experiences" />
    </div>
    <div class="container white card margin-bottom" :style="imgSectionStyle">
      <RightData :data="diplomes" />
    </div>
    <div class="container white card margin-bottom" :style="imgSectionStyle">
      <RightData :data="projets" />
    </div>
    <div class="container white card margin-bottom" :style="imgSectionStyle">
      <RightData :data="certifications" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RightData from '@/components/RightData.vue'

defineProps({
  experiences: { type: Object, default: () => ({}) },
  diplomes: { type: Object, default: () => ({}) },
  certifications: { type: Object, default: () => ({}) },
  projets: { type: Object, default: () => ({}) },
})

const imgSectionStyle = computed(() => {
  return {
    "background-repeat": "no-repeat",
    "background-size": "100% 300px"
  }
})
</script>