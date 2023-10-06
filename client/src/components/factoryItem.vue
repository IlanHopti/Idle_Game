<script setup lang="ts">
const props = defineProps<{
  factoryName: string
  factoryLevel: number
  borderColor: string
  factoryImg: string
}>()
</script>

<template>
  <div
    class="w-full border-2 border-solid rounded-3xl p-6 mt-6 mb-6 text-center flex flex-row items-center justify-start"
    :class="borderColor"
  >
    <div class="mr-6">
      <img
        class="w-32 rounded-lg border-2 border-solid"
        :class="borderColor"
        :src="props.factoryImg"
        alt="wood"
      />
    </div>
    <div class="flex flex-col justify-between w-full h-12">
      <div class="flex flex-row justify-between">
        <div>{{ factoryName }}</div>
        <div>Lvl {{ factoryLevel }}</div>
      </div>
      <div class="w-full h-1 bg-green-700 rounded-lg mt-2"></div>
    </div>
  </div>
</template>
