<template>
  <header class="bg-[#43c8b7] py-4">
    <div class="container mx-auto">
      <nav class="flex items-center justify-between">
        <div class="flex flex-row items-center">
          <img class="w-12 mr-4" src="../public/idle_logo.png" alt="idle_logo" />
          <div class="text-white text-2xl font-bold">Idle Factory</div>
        </div>
        <div class="space-x-4">
          <router-link to="/" class="text-white hover:text-blue-200">Home</router-link>
          <router-link to="/inventory" class="text-white hover:text-blue-200"
            >Inventory</router-link
          >
          <router-link to="/marketplace" class="text-white hover:text-blue-200"
            >MarketPlace</router-link
          >
          <router-link to="/achievements" class="text-white hover:text-blue-200"
            >Achievements</router-link
          >
          <router-link to="/register" class="text-white hover:text-blue-200">Register</router-link>
          <router-link to="/login" class="text-white hover:text-blue-200">Login</router-link>
        </div>
      </nav>
    </div>
  </header>
</template>
