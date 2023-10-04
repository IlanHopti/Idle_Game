<script setup lang="ts">
const props = defineProps<{
  resourceImg: string
  resourceName: string
  resourceAmount: number
}>()
</script>

<template>
  <div
    class="flex flex-col justify-center items-center border-2 border-solid rounded-lg w-32 pl-6 pr-6 m-auto"
    :class="`border-${resourceName.toLowerCase()}`"
  >
    <img class="w-20 h-auto" :src="resourceImg" alt="wood" />
    <div class="text-xl font-bold">{{ resourceName }}</div>
    <div class="text-md font-bold">
      {{ resourceAmount }}
    </div>
  </div>
</template>
