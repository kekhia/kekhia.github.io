<template>
  <div v-if="data" :id="data.titre">
    <h2 class="text-grey padding-16">
      <i class="fas margin-right xxlarge text-teal" :class="data.icon"></i>
      {{ capitalize(data.titre) }}
    </h2>
    <div v-for="(item, index) in data.list" :key="index" class="container">
      <h5 class="opacity">
        <b>{{ item.titre }}</b>
        <span
          @click="scrollTop"
          class="fas fa-angle-double-up top"
        ></span>
      </h5>
      <h6 class="text-teal">
        <i class="fas fa-calendar-alt margin-right"></i>
        {{ item.dateDebut }} -
        <span
          v-if="item.dateFin"
          :class="[item.dateFin === 'Présent' ? 'tag teal round' : '']"
        > {{ item.dateFin }}</span>
        <span v-if="item.duree"> ( {{ item.duree }} )</span>
      </h6>

      <!-- ✅ Affichage du bloc Markdown -->
      <div
        class="markdown-content"
        v-if="item.lignes?.length"
        v-html="renderMarkdown(item.lignes.join('\n'))"
        @click="scrollToMe"
      ></div>

      <!-- Références (inchangé) -->
      <p v-if="item.references?.length" class="references-container">
        <template v-for="(ref, index2) in item.references" :key="index2">
          <span
            @click="toLink(ref)"
            :id="'id_ref' + index2"
            class="reference-link"
          >
            <template v-if="item.references.length === 1">
              Référence
            </template>
            <template v-else>
              Référence {{ index2 + 1 }}
            </template>
          </span>
          <span v-if="index2 < item.references.length - 1">, </span>
        </template>
      </p>
      <hr v-if="index + 1 < data.list.length" />
    </div>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MarkdownIt from 'markdown-it'
import Loading from '@/components/Loading.vue'

const props = defineProps({
  data: { type: Object, default: null },
})

// ✅ Initialisation de markdown-it
const md = new MarkdownIt({
  breaks: true, // ✅ Convertit les \n en <br>
  linkify: true, // (optionnel) transforme les URLs en liens cliquables
  html: true,    // ✅ Désactive le HTML brut (évite les conflits)
})

// ✅ Fonction de conversion
function renderMarkdown(text) {
  return md.render(text)
}


function capitalize(value) {
  if (!value) return ''
  return value.toString().toUpperCase()
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  // si vous utilisez vue-router, décommentez :
  // router.push({ name: 'home' })
}

function scrollToMe(event) {
  const idEvent = event.target.id
  if (idEvent.substring(0, 3) === 'id_') {
    scroll(idEvent.substring(3))
  }
}

function scroll(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
}

function toLink(url) {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>