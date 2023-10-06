<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-1/4">
      <h2 class="text-2xl font-semibold mb-6">Connexion</h2>
      <p class="text-xl font-semibold mb-6 text-red-500 animate-bounce">{{ errorMessage }}</p>
      <form @submit.prevent="loginUser">
        <div class="mb-4">
          <label for="email" class="block font-medium text-gray-700">Email or Username</label>
          <input
            type="text"
            id="email"
            v-model="emailOrUsername"
            class="mt-1 p-2 w-full border rounded"
          />
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
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Log in
        </button>
      </form>
      <p class="mt-4">
        Not Registered Yet ?
        <router-link to="/register" class="text-blue-500">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'
import { useUserStore } from '@/stores/user'

const emailOrUsername = ref('')
const password = ref('')
const errorMessage = ref('')

const connectUser = useUserStore()

connectUser
  .fetchUser()
  .then(() => {
    if (connectUser.user.length !== 0) {
      router.push('/')
    }
  })
  .catch((err) => {
    console.log(err)
  })

const loginUser = async () => {
  try {
    // Assuming connectUser.login returns a promise
    const result = await connectUser.login(emailOrUsername.value, password.value)
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
