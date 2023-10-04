<script setup lang="ts">
const props = defineProps<{
  factoryName: string
}>()
</script>

<template>
  <main>
    <div
      class="w-full border-2 border-dashed border-gray-200 rounded-3xl p-6 mt-6 mb-6 text-center flex flex-row items-center justify-start"
    >
      <div class="border-2 border-dashed border-gray-200 rounded-lg p-3 text-center mr-6">+</div>
      <div class="flex flex-col justify-center w-full">
        <div class="flex flex-row justify-between">
          <div>{{ factoryName }}</div>
          <div>Lvl 0</div>
        </div>
        <div class="w-full h-1 bg-black rounded-lg mt-2"></div>
      </div>
    </div>
  </main>
</template>
