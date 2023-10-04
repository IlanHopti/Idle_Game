<script setup lang="ts">
import InventoryResource from '../components/inventory/inventoryResource.vue'
import InventoryFactories from '../components/inventory/inventoryFactories.vue'
</script>

<template>
  <div class="text-center m-6">
    <h2 class="text-3xl font-bold my-6">Resources :</h2>
    <InventoryResource />

    <h2 class="text-3xl font-bold my-6">Factories :</h2>

    <InventoryFactories />
  </div>
</template>
