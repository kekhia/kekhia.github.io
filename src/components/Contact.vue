<template>
  <div id="contact" class="modal">
    <div class="modal-content animate-zoom">
      <div class="container hautmodal">
        <i
          @mouseover="hover = 'far fa-times-circle'"
          @mouseleave="hover = 'fas fa-times-circle'"
          class="buttonX"
          :class="hover"
          @click="closeContact"
        ></i>
        <h1>{{ contactinfo.titre }}</h1>
      </div>
      <div class="container">
        <p>{{ contactinfo.invitation }}</p>
        <form @submit.prevent="envoiEmail">
          <div v-if="errors.length">
            <b>{{ contactinfo.notification }} :</b>
            <ul>
              <li v-for="(error, index) in errors" :key="index" class="errormessage">{{ error }}</li>
            </ul>
          </div>
          <p>
            <input
              class="input padding-16 border"
              type="text"
              required
              :placeholder="`${contactinfo.name}*`"
              v-model.trim="form.name"
            />
          </p>
          <p>
            <input
              class="input padding-16 border"
              type="email"
              required
              :placeholder="`${contactinfo.email}*`"
              v-model.trim="form.email"
            />
          </p>
          <p>
            <input
              class="input padding-16 border"
              type="text"
              required
              :placeholder="`${contactinfo.subject}*`"
              v-model.trim="form.subject"
            />
          </p>
          <p>
            <textarea
              class="padding-16 border"
              required
              :placeholder="`${contactinfo.message}*`"
              v-model.trim="form.message"
            ></textarea>
          </p>
          <p>
            <button class="button" type="submit">{{ contactinfo.btvalider }}</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>

import { supabase } from '@/supabase'
import { ref, reactive } from 'vue'

const props = defineProps({
  contactinfo: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close'])

const errors = ref([])
const hover = ref('fas fa-times-circle')
const form = reactive({
  name: null,
  email: null,
  subject: null,
  message: null,
})

function closeContact() {
  emit('close')
}

function validEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

function envoiEmail() {
  const { name, email, subject, message } = form
  const { notname, notemail1, notemail2, notsubject, notmessage } = props.contactinfo
  errors.value = []
  if (!name) errors.value.push(notname)
  if (!email) {
    errors.value.push(notemail1)
  } else if (!validEmail(email)) {
    errors.value.push(notemail2)
  }
  if (!subject) errors.value.push(notsubject)
  if (!message) errors.value.push(notmessage)

  if (!errors.value.length) {
    submitForm()
  }
}

async function submitForm() {
  try {
    const ip = await getUserIp();

    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          nom: form.name,
          email: form.email,
          sujet: form.subject,
          message: form.message,
          ip: ip
        }
      ])

    if (error) throw error
    
    for (const item in form) {
      form[item] = null
    }

    closeContact()
    alert('Votre message a bien été envoyé')
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire:', error)
    alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.")
  }
}

async function getUserIp() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    return null;
  }
}
</script>
