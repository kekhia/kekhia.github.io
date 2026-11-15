<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { user } from '@/services'

const route = useRoute()

watch(
  () => route.path,
  () => {
    user.removeUser()
  }
)
</script>