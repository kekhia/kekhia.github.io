<template>
  <div class="my-container">
    <div class="content">
      <div class="center">
        <img 
          :src="image" 
          alt="Pokemon aléatoire" 
          @error="handleImageError"
        />
        <h1>Hey, cette page n'existe pas !</h1>
        <RouterLink :to="{ name: 'home' }">
          <button type="button" class="button">Retour à l'accueil</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { pokemon } from '@/services'

const image = ref('')

onMounted(() => {
  image.value = pokemon.getImage()
})

function handleImageError(event) {
  // Si l'artwork n'existe pas, on extrait l'ID et on bascule sur le sprite standard
  const match = event.target.src.match(/(\d+)\.png$/)
  if (match) {
    const id = match[1]
    event.target.src = pokemon.getFallbackImage(id)
  }
}
</script>

<style lang="scss">
@use "@/assets/css/style.scss";
</style>