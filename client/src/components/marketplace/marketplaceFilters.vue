<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  type: string
  sort: string
}>()

const selectedType = ref(props.type)
const selectedSort = ref(props.sort)

const emits = defineEmits(['updateType', 'updateSort'])

// Fonction pour émettre la mise à jour de la valeur "type"
function emitTypeUpdate(newType: string) {
  emits('updateType', newType)
}

// Fonction pour émettre la mise à jour de la valeur "sort"
function emitSortUpdate(newSort: string) {
  emits('updateSort', newSort)
}

watch(selectedType, (newType) => {
  emitTypeUpdate(newType)
})

watch(selectedSort, (newSort) => {
  emitSortUpdate(newSort)
})
</script>

<template>
  <div
    id="drawer-example"
    class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800"
    tabindex="-1"
    aria-labelledby="drawer-label"
  >
    <h5
      id="drawer-label"
      class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      Filters
    </h5>
    <!-- Close button -->
    <button
      type="button"
      data-drawer-hide="drawer-example"
      aria-controls="drawer-example"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
    <!-- Filters for price and type -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-200"> Price </label>
      <select
        id="price"
        name="price"
        v-model="selectedSort"
        @change="emitSortUpdate(props.sort)"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-gray-300"
      >
        <option value="asc">Ascendent</option>
        <option value="desc">Descendent</option>
      </select>
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-200"> Resources </label>
      <select
        id="type"
        name="type"
        v-model="selectedType"
        @change="emitTypeUpdate(props.type)"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-gray-300"
      >
        <option value="Wood">Wood</option>
        <option value="Coal">Coal</option>
        <option value="Stone">Stone</option>
        <option value="Iron">Iron</option>
        <option value="Gold">Gold</option>
        <option value="Diamond">Diamond</option>
      </select>
    </div>
  </div>
</template>
