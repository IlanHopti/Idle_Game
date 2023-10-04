<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-1/4">
      <h2 class="text-2xl font-semibold mb-6">Inscription</h2>
      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label for="username" class="block font-medium text-gray-700">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block font-medium text-gray-700">Adresse e-mail</label>
          <input type="email" id="email" v-model="email" class="mt-1 p-2 w-full border rounded" />
        </div>
        <div class="mb-6">
          <label for="password" class="block font-medium text-gray-700">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          S'inscrire
        </button>
      </form>
      <p class="mt-4">
        Déjà membre ? <router-link to="/login" class="text-blue-500">Connectez-vous</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')

const registerUser = () => {
  console.log(username.value, email.value, password.value)
}
</script>
