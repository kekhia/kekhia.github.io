<template>
  <div>
    <div class="centerProfile">
      <div v-if="profile">
        <br />
        <img :src="profileImage" class="widthProfile" alt="Photo de profil" />
      </div>
      <div v-if="profile">
        <h1 class="fontProfile">
          <i>{{ profile.poste1 }} {{ profile.firstname }} {{ profile.lastname }} &nbsp;</i>
          <a @click="toLinkedin()" class="fab fa-linkedin link"></a>
          <br/>
        </h1>
      </div>
      <div v-else>
        <Loading />
      </div>
    </div>
    <div v-if="profile" class="fontPoste">
        <span>{{ profile.poste2 }}</span><br/>
        <span>{{ profile.poste3 }}</span>
    </div>
    <div v-else>
      <Loading />
    </div>
  </div>
</template>

<script setup>
import Loading from '@/components/Loading.vue'
import profileImage from '@/assets/img/myimage.png'

const props = defineProps({
  profile: {
    type: Object,
    default: null,
  },
})
function toLinkedin() {
  if (props.profile?.linkedin) {
    window.open(props.profile.linkedin, '_blank')
  }
}
</script>