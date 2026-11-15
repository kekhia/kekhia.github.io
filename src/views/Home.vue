<template>
  <div>
    <CV :data="data" />
  </div>
</template>

<script setup>
import db from '@/assets/db.json'
import CV from '@/components/CV.vue'

const data = db
</script>

<style lang="scss">
@use "@/assets/css/style.scss";
.link {
  cursor: pointer;
}
</style>