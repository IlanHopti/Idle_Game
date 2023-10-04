<script setup lang="ts">
import InventoryResourceCase from './inventoryResourceCase.vue'
</script>

<template>
  <div class="grid grid-cols-3 gap-16 m-auto">
    <InventoryResourceCase
      resourceImg="../../public/resources/wood.png"
      resourceName="Wood"
      :resourceAmount="100"
    />

    <InventoryResourceCase
      resourceImg="../../public/resources/coal.png"
      resourceName="Coal"
      :resourceAmount="100"
    />

    <InventoryResourceCase
      resourceImg="../../public/resources/stone.png"
      resourceName="Stone"
      :resourceAmount="100"
    />

    <InventoryResourceCase
      resourceImg="../../public/resources/iron_ingot.png"
      resourceName="Iron"
      :resourceAmount="100"
    />

    <InventoryResourceCase
      resourceImg="../../public/resources/gold_ingot.png"
      resourceName="Gold"
      :resourceAmount="100"
    />

    <InventoryResourceCase
      resourceImg="../../public/resources/diamond.png"
      resourceName="Diamond"
      :resourceAmount="100"
    />
  </div>
</template>
