<template>
  <div>
    <div class="content margin-top" style="max-width: 1400px">
      <div class="row-padding">
        <Left
          :profile="data.CV.profile"
          :competences="data.CV.competences"
          :langages="data.CV.langages"
          :softskills="data.CV.softskills"
          :contact="data.CV.contact"
          :permis="data.CV.permis"
        />
        <Right
          :experiences="data.CV.experiences"
          :diplomes="data.CV.diplomes"
          :certifications="data.CV.certifications"
          :projets="data.CV.projets"
        />
      </div>
    </div>
    <Footer :footer="data.CV.footer" />
  </div>
</template>

<script setup>
import Left from '@/components/Left.vue'
import Right from '@/components/Right.vue'
import Footer from '@/components/Footer.vue'

defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>