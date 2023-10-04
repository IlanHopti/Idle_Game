<script setup lang="ts">
import { ref } from 'vue'
import FactoryModal from '../components/factoryModal.vue'

const factoryLevelMax = ref(10)
const factoryProduction = ref(5)
const factoryProductionImg = ref(
  'https://cdn.discordapp.com/attachments/1158396116388302910/1159052969879273533/wood-removebg-preview.png?ex=651e7bb2&is=651d2a32&hm=d3475f03b3673184d9e4ba24356e4f639ce988c706ccb3f7b10390f221627fee&'
)
const unitsNeededForUpgrade = ref({ wood: 10, coin: 20, iron: 3000, coal: 2000, gold:4000, diamond: 1, stone: 300 })

const props = defineProps<{
  factoryName: string
  factoryLevel: number
  borderColor: string
  factoryImg: string
  modalId: string
}>()
</script>

<template>
  <div>
    <!-- Main modal -->
    <div
      :id="modalId"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <FactoryModal
        :modal-id="modalId"
        :factory-img="props.factoryImg"
        :factory-name="props.factoryName"
        :factory-level="props.factoryLevel"
        :factory-level-max="factoryLevelMax"
        :factory-production="factoryProduction"
        :factory-production-img="factoryProductionImg"
        :units-needed-for-upgrade="unitsNeededForUpgrade"
      />
    </div>

    <div
      :data-modal-target="modalId"
      :data-modal-toggle="modalId"
      class="w-full border-2 border-solid rounded-3xl p-6 mt-6 mb-6 text-center flex flex-row items-center justify-start"
      :class="borderColor"
    >
      <div class="border-2 border-solid rounded-lg text-center mr-6" :class="borderColor">
        <img class="w-32 h-auto" :src="props.factoryImg" alt="wood" />
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
