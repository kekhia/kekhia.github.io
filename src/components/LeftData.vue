<template>
  <div v-if="data">
    <h2 class="padding-16" style="color: #F8FAFC;">
      <i :class="data.icon"></i>
      {{ data.titre }}
    </h2>

    <!-- Cas des compétences (liste imbriquée avec lignes) -->
    <div v-if="data.titre === 'compétences clés'">
      <div v-for="(categorie, index) in data.list" :key="index" style="color: #F8FAFC;">
        <h3 class="pcaps">
          <i :class="categorie.icon"></i>
          {{ categorie.titre }}
        </h3>
        <div
          v-for="(ligne, i) in categorie.lignes"
          :key="i"
          style="color: #F8FAFC;"
        >
          <p>{{ ligne.titre }}</p>
          <Bar v-if="ligne.niveau !== undefined" :niveau="ligne.niveau" />
        </div>
        <hr v-if="index < data.list.length - 1" />
      </div>
    </div>

    <!-- Cas des langages / softskills / permis (liste simple) -->
    <div v-else>
      <div v-for="(item, index) in data.list" :key="index" style="color: #F8FAFC;">
        <p>{{ item.titre }}</p>
        <Bar v-if="item.niveau !== undefined" :niveau="item.niveau" />
      </div>
    </div>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>

<script setup>
import Loading from '@/components/Loading.vue'
import Bar from '@/components/Bar.vue'

defineProps({
  data: {
    type: Object,
    default: null,
  },
})
</script>