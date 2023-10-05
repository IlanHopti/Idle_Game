<script setup lang="ts">
import { ref } from 'vue'
import FactoryModal from '../components/factoryModal.vue'

const factoryLevelMax = ref(10)
const factoryProduction = ref(5)
const unitsNeededForUpgrade = ref({
  wood: 10,
  coin: 20,
  iron: 3000,
  coal: 2000,
  gold: 4000,
  diamond: 1,
  stone: 300
})

const props = defineProps<{
  factoryName: string
  factoryLevel: number
  borderColor: string
  modalId: string
  factoryImg: string
  factoryProductionImg: string
}>()

console.log('modalId item: ' + props.modalId)
</script>

<template>
  <div>
    <!-- Main modal -->
    <div
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <FactoryModal
        :modal-id="props.modalId"
        :factory-img="props.factoryImg"
        :factory-name="props.factoryName"
        :factory-level="props.factoryLevel"
        :factory-level-max="factoryLevelMax"
        :factory-production="factoryProduction"
        :factory-production-img="factoryProductionImg"
        :units-needed-for-upgrade="unitsNeededForUpgrade"
        :border-color="props.borderColor"
      />
    </div>

    <div
      :data-modal-target="props.modalId"
      :data-modal-toggle="props.modalId"
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
  </div>
</template>
