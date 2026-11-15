<template>
  <footer class="footer container center margin-top">
    <span v-if="footer">
      <i :class="footer.icon">&nbsp;</i>
       {{ footer.name }} {{ getDateYear }}
    </span>
    <span v-else>
      <FooterLoading />
    </span>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import FooterLoading from '@/components/FooterLoading.vue'

const props = defineProps({
  footer: {
    type: Object,
    default: null,
  },
})

const getDateYear = computed(() => {
  return new Date().getFullYear()
})
</script>