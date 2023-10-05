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
import { ref } from 'vue'
import ResourcesComponent from '@/components/ResourcesComponent.vue'

const userConnected = useUserStore()
const isLogged = ref(userConnected.isLogged)
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
