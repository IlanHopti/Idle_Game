<template>
    <header class="bg-black py-4">
        <div class="container mx-auto">
            <nav class="flex items-center justify-between">
                <div class="text-white text-2xl font-bold">Mon Application</div>
                <div class="space-x-4">
                    <router-link to="/" class="text-white hover:text-blue-200">Home</router-link>
                    <router-link to="/factories" class="text-white hover:text-blue-200">My Factories</router-link>
                    <router-link to="/marketplace" class="text-white hover:text-blue-200">MarketPlace</router-link>
                    <router-link to="/achievements" class="text-white hover:text-blue-200">Achievements</router-link>
                    <template v-if="!isLogged">
                        <router-link to="/register" class="text-white hover:text-blue-200">Register</router-link>
                        <router-link to="/login" class="text-white hover:text-blue-200">Login</router-link>
                    </template>
                    <template v-else>
                        <button @click="logout" class="text-white hover:text-blue-200">Logout</button>
                    </template>
                </div>
                <div v-if="isLogged">
                    <ResourcesComponent></ResourcesComponent>
                </div>
            </nav>
        </div>
    </header>
    <router-view />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref, onMounted, onErrorCaptured, watch } from 'vue'
import ResourcesComponent from "@/components/ResourcesComponent.vue";

const userConnected = useUserStore()
const isLogged = ref(userConnected.isLogged)

// Watch for changes in userConnected.isLogged and update isLogged.value
onMounted(() => {
  const unwatchIsLogged = watch(() => userConnected.isLogged, (newValue) => {
    isLogged.value = newValue;
  });

  // Clean up the watcher when the component is unmounted
  onErrorCaptured(() => {
    unwatchIsLogged();
  });
});

// Fetch user data when the component is mounted
onMounted(async () => {
  try {
    await userConnected.fetchUser();
  } catch (err) {
    console.error(err);
  }
});

const logout = () => {
  userConnected.logout();
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
