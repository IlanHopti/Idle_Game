<template>
  <Navbar />
  <div v-if="isLogged">
    <ResourcesComponent></ResourcesComponent>
  </div>
  <router-view />
</template>

<script setup lang="ts">
import Navbar from './components/navbar.vue'
import { useUserStore } from '@/stores/user'
import { ref, onMounted, onErrorCaptured, watch } from 'vue'
import ResourcesComponent from '@/components/ResourcesComponent.vue'

const userConnected = useUserStore()
const isLogged = ref(userConnected.isLogged)

// Watch for changes in userConnected.isLogged and update isLogged.value
onMounted(() => {
  const unwatchIsLogged = watch(
    () => userConnected.isLogged,
    (newValue) => {
      console.log(newValue)
      isLogged.value = newValue
    }
  )

  // Clean up the watcher when the component is unmounted
  onErrorCaptured(() => {
    unwatchIsLogged()
  })
})

// Fetch user data when the component is mounted
onMounted(async () => {
  try {
    await userConnected.fetchUser()
  } catch (err) {
    console.error(err)
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
