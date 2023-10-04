<script setup lang="ts">
import { ref, watchEffect } from 'vue'

// props declaration
const props = defineProps<{
  modalId: string
  factoryImg: string
  factoryName: string
  factoryLevel: number
  factoryLevelMax: number
  factoryProduction: number
  factoryProductionImg: string
  unitsNeededForUpgrade: { wood: number; coin: number }
}>()

console.log(props.factoryName)

const myUnits = ref({ wood: 0, coin: 20 })

const canUpgrade = ref(false)

watchEffect(() => {
  if (myUnits.value.wood >= props.unitsNeededForUpgrade.wood) {
    canUpgrade.value = true
  } else {
    canUpgrade.value = false
  }
})
</script>

<template>
  <div class="relative w-full max-w-2xl max-h-full">
    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <!-- Modal body -->
      <div class="p-6 space-y-6">
        <!-- Close button -->
        <button
          type="button"
          class="float-right text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          :data-modal-hide="modalId"
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
        </button>

        <!-- Description Factory -->
        <div class="flex flex-row items-center justify-evenly">
          <div class="border-2 border-solid border-wood rounded-lg text-center mr-6 w-fit">
            <img class="w-32 h-auto" :src="factoryImg" />
          </div>
          <div class="flex flex-col items-center justify-between h-32">
            <h1 class="text-2xl font-bold">{{ factoryName }}</h1>
            <p class="text-sm text-gray-500">Lvl {{ factoryLevel }} / {{ factoryLevelMax }}</p>
            <p class="text-md font-bold flex flex-row items-center">
              {{ factoryProduction }}
              <img class="w-6 h-auto ml-2" :src="factoryProductionImg" />
              / h
            </p>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-full border-t-2 border-dashed border-black"></div>

        <!-- Units for upgrade -->
        <div class="flex flex-row items-center justify-evenly mt-4 mb-4">
          <div class="flex flex-col items-center justify-evenly">
            <div class="flex flex-row items-center justify-evenly">
              <div class="mr-6 w-fit">
                <img class="w-16 h-auto" :src="factoryProductionImg" />
              </div>
              <div class="flex flex-row items-center justify-between h-16">
                <p>
                  <span
                    class="font-bold"
                    :class="
                      myUnits.wood < unitsNeededForUpgrade.wood ? `text-red-700` : `text-green-700`
                    "
                  >
                    {{ myUnits.wood }}
                  </span>
                  / {{ unitsNeededForUpgrade.wood }}
                </p>
              </div>
            </div>
            <div class="flex flex-row items-center justify-evenly">
              <div class="mr-6 w-fit">
                <img
                  class="w-16 h-auto"
                  src="https:cdn.discordapp.com/attachments/1158396116388302910/1159065038368280606/fc270cd6-2a0f-47e5-bc40-bb69456b24a0.jpeg?ex=651e86ef&is=651d356f&hm=d464cda1e6ea466bd90ae775680af138bd63bf1cc348642964d512d48c3f6832&"
                />
              </div>
              <div class="flex flex-row items-center justify-between h-16">
                <p>
                  <span
                    class="font-bold"
                    :class="
                      myUnits.coin < unitsNeededForUpgrade.coin ? `text-red-700` : `text-green-700`
                    "
                  >
                    {{ myUnits.coin }}
                  </span>
                  / {{ unitsNeededForUpgrade.coin }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-full border-t-2 border-dashed border-black"></div>

        <!-- Indication for next level -->
        <div class="flex flex-col items-center justify-evenly mt-4 mb-4">
          <h2 class="text-xl font-bold">Level {{ factoryLevel + 1 }} :</h2>
          <div>
            <p class="flex flex-row items-center justify-between text-md font-bold">
              {{ factoryProduction * (factoryLevel + 1) }}
              <img class="w-6 h-auto ml-2" :src="factoryProductionImg" />
              / h
            </p>
          </div>
        </div>
        <button
          :data-popover-target="!canUpgrade ? `popover-default` : ``"
          type="button"
          class="w-full px-4 py-2 text-base font-medium text-center text-white transition duration-200 ease-in bg-green-700 rounded-lg shadow-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          :class="
            !canUpgrade ? `cursor-not-allowed bg-red-700 hover:bg-red-900 focus:ring-red-500` : ``
          "
        >
          Upgrade
        </button>

        <div
          data-popover
          id="popover-default"
          role="tooltip"
          class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
        >
          <div
            class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700"
          >
            <h3 class="font-semibold text-red-900 dark:text-white">
              You don't have enough resources
            </h3>
          </div>
          <div data-popper-arrow></div>
        </div>
      </div>
    </div>
  </div>
</template>
