<template>
    <header class="bg-blue-500 py-4">
        <div class="container mx-auto">
            <nav class="flex items-center justify-between">
                <div class="text-white text-2xl font-bold">Mon Application</div>
                <div class="space-x-4">
                    <router-link to="/" class="text-white hover:text-blue-200">Home</router-link>
                    <router-link to="/factories" class="text-white hover:text-blue-200">My Factories</router-link>
                    <router-link to="/marketplace" class="text-white hover:text-blue-200">MarketPlace</router-link>
                    <router-link to="/achievements" class="text-white hover:text-blue-200">Achievements</router-link>
                    <router-link to="/register" class="text-white hover:text-blue-200">Register</router-link>
                    <router-link to="/login" class="text-white hover:text-blue-200">Login</router-link>
                </div>
            </nav>
        </div>
    </header>

    <router-view />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
