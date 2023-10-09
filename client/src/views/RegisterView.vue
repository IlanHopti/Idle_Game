<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-1/4">
      <h2 class="text-2xl font-semibold mb-6">Inscription</h2>
      <p class="text-xl font-semibold mb-6 text-red-500 animate-bounce">{{ errorMessage }}</p>
      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label for="username" class="block font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="email" class="mt-1 p-2 w-full border rounded" />
        </div>
        <div class="mb-6">
          <label for="password" class="block font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            v-model="confirm_password"
            class="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Register
        </button>
      </form>
      <p class="mt-4">
        Already member ? <router-link to="/login" class="text-blue-500">Log In</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores/user'

const username = ref('')
const email = ref('')
const password = ref('')
const confirm_password = ref('')
const errorMessage = ref('')

const registeredUser = useUserStore()
registeredUser
  .fetchUser()
  .then(() => {
    if (registeredUser.user.length !== 0) {
      router.push('/')
    }
  })
  .catch((err) => {
    console.log(err)
  })
const registerUser = async () => {
  try {
    // Assuming connectUser.login returns a promise
    const result = await registeredUser.register(
      email.value,
      username.value,
      password.value,
      confirm_password.value
    )
    if (result.success) {
      await router.push('/')
    } else {
      errorMessage.value = result.message
    }
  } catch (error) {
    errorMessage.value = 'An unexpected error occurred.'
  }
}
</script>
