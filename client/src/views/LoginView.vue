<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-1/4">
      <h2 class="text-2xl font-semibold mb-6">Connexion</h2>
      <form @submit.prevent="loginUser">
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
          Se connecter
        </button>
      </form>
      <p class="mt-4">
        Pas encore de compte ?
        <router-link to="/register" class="text-blue-500">Inscrivez-vous</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const loginUser = () => {
  console.log(email.value, password.value)
}
</script>
