<template>
  <div class="third">
    <div class="text-grey card-4" style="background-color: #1E293B;">
      <div class="display-container">
        <Profile :profile="profile" />
        <div class="container">
          <p>
            <button v-if="contact" class="button" @click="openContact">
              {{ contact.titre }}
            </button>
          </p>
          <Contact
            v-if="isContactVisible"
            :contactinfo="contact"
            @setMessage="setMessage"
            @close="isContactVisible = false"
          />
          <hr />
          <hr />
          <LeftData :data="competences" />
          <br />
          <hr />
          <hr />
          <LeftData :data="langages" />
          <br />
          <hr />
          <hr />
          <LeftData :data="softskills" />
          <br />
          <hr />
          <hr />
          <LeftData :data="permis" />
          <br />
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Profile from '@/components/Profile.vue'
import LeftData from '@/components/LeftData.vue'
import Contact from '@/components/Contact.vue'

defineProps({
  profile: { type: Object, default: () => ({}) },
  competences: { type: Object, default: () => ({}) },
  langages: { type: Object, default: () => ({}) },
  softskills: { type: Object, default: () => ({}) },
  contact: { type: Object, default: null },
  permis: { type: Object, default: () => ({}) },
})

const message = ref('')
const isContactVisible = ref(false)

function openContact() {
  isContactVisible.value = true
}

function setMessage(newMessage) {
  message.value = newMessage
}
</script>