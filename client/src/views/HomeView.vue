<script setup lang="ts">
import FactoryColumn from '../components/factoriesColumn.vue'
import { Modal } from 'flowbite-vue'
import { onBeforeMount, ref } from 'vue'
import { useFactoriesStore } from '@/stores/factories'
import { useUserStore } from '@/stores/user'

import CoalResource from '../../public/resources/coal.png'
import IronResource from '../../public/resources/iron_ingot.png'
import WoodResource from '../../public/resources/wood.png'
import StoneResource from '../../public/resources/stone.png'
import CoinResource from '../../public/resources/coin.jpeg'
import DiamondResource from '../../public/resources/diamond.png'
import GoldResource from '../../public/resources/gold_ingot.png'
import CoalFactory from '../../public/factories/coal_factory.jpeg'
import IronFactory from '../../public/factories/iron_factory.png'
import WoodFactory from '../../public/factories/wood_factory.png'
import StoneFactory from '../../public/factories/stone_factory.jpeg'
import DiamondFactory from '../../public/factories/diamond_factory.jpeg'
import GoldFactory from '../../public/factories/gold_factory.png'
import Coin from '../../public/resources/coin.jpeg'

const factories = useFactoriesStore()
const user = useUserStore()

let factoryData: object | undefined = ref({})

const isShowModal = ref(false)
function closeModal() {
  isShowModal.value = false
}
function showModal(id: string) {
  console.log(id)
  factoryData = factories.getFactory(id)
  console.log(factoryData)
  // console.log(factories.getFactory(id))
  isShowModal.value = true
}

const handleClick = (e: Event) => {
  if (useUserStore().user.length !== 0) {
    useUserStore().redeemResources()
  }
}
onBeforeMount(() => {
  console.log('BeforeMount')
  factories.getFactoryAllResources().then(() => {
    console.log(factories.factoryResources)
    console.log('rzjdbfosbdf')
    console.log(factories.factoryResourcesWood)
  })
})

function factoryName(key: string) {
  switch (key) {
    case 'Wood':
      return 'Wood Factory'
    case 'Stone':
      return 'Stone Factory'
    case 'Coal':
      return 'Coal Factory'
    case 'Iron':
      return 'Iron Factory'
    case 'Gold':
      return 'Gold Factory'
    case 'Diamond':
      return 'Diamond Factory'
    default:
      return ''
  }
}
function resourceImage(key: string) {
  switch (key) {
    case 'Wood':
      return WoodResource
    case 'Stone':
      return StoneResource
    case 'Coal':
      return CoalResource
    case 'Iron':
      return IronResource
    case 'Gold':
      return GoldResource
    case 'Diamond':
      return DiamondResource
    case 'Coin':
      return CoinResource
    default:
      return ''
  }
}

function factoryImage(key: string) {
  switch (key) {
    case 'Wood':
      return WoodFactory
    case 'Stone':
      return StoneFactory
    case 'Coal':
      return CoalFactory
    case 'Iron':
      return IronFactory
    case 'Gold':
      return GoldFactory
    case 'Diamond':
      return DiamondFactory
    default:
      return ''
  }
}

function borderColor(key: string) {
  switch (key) {
    case 'Wood':
      return 'border-wood'
    case 'Stone':
      return 'border-stone'
    case 'Coal':
      return 'border-coal'
    case 'Iron':
      return 'border-iron'
    case 'Gold':
      return 'border-gold'
    case 'Diamond':
      return 'border-diamond'
    default:
      return ''
  }
}

function actualResource(key: string) {
  switch (key) {
    case 'Wood':
      return user.user.resources.wood
    case 'Stone':
      return user.user.resources.stone
    case 'Coal':
      return user.user.resources.coal
    case 'Iron':
      return user.user.resources.iron
    case 'Gold':
      return user.user.resources.gold
    case 'Diamond':
      return user.user.resources.diamond
    case 'Coin':
      return user.user.money
    default:
      return ''
  }
}

function resourcesNeededForUpgrade(type: string, actualLevel: number) {
  switch (type) {
    case 'Wood':
      return factories.factoryResourcesWood[actualLevel + 1].wood
    case 'Stone':
      return factories.factoryResourcesStone[actualLevel + 1].stone
    case 'Coal':
      return factories.factoryResourcesCoal[actualLevel + 1].coal
    case 'Iron':
      return factories.factoryResourcesIron[actualLevel + 1].iron
    case 'Gold':
      return factories.factoryResourcesGold[actualLevel + 1].gold
    case 'Diamond':
      return factories.factoryResourcesDiamond[actualLevel + 1].diamond
    default:
      return ''
  }
}
function coinNeededForUpgrade(type: string, actualLevel: number) {
  switch (type) {
    case 'Wood':
      return factories.factoryResourcesWood[actualLevel + 1].money
    case 'Stone':
      return factories.factoryResourcesStone[actualLevel + 1].money
    case 'Coal':
      return factories.factoryResourcesCoal[actualLevel + 1].money
    case 'Iron':
      return factories.factoryResourcesIron[actualLevel + 1].money
    case 'Gold':
      return factories.factoryResourcesGold[actualLevel + 1].money
    case 'Diamond':
      return factories.factoryResourcesDiamond[actualLevel + 1].money
    default:
      return ''
  }
}

function canUpgrade(type: string, actualLevel: number) {
  switch (type) {
    case 'Wood':
      return (
        user.user.resources.wood >= factories.factoryResourcesWood[actualLevel + 1].wood &&
        user.user.money >= factories.factoryResourcesWood[actualLevel + 1].money
      )
    case 'Stone':
      return (
        user.user.resources.stone >= factories.factoryResourcesStone[actualLevel + 1].stone &&
        user.user.money >= factories.factoryResourcesStone[actualLevel + 1].money
      )
    case 'Coal':
      return (
        user.user.resources.coal >= factories.factoryResourcesCoal[actualLevel + 1].coal &&
        user.user.money >= factories.factoryResourcesCoal[actualLevel + 1].money
      )
    case 'Iron':
      return (
        user.user.resources.iron >= factories.factoryResourcesIron[actualLevel + 1].iron &&
        user.user.money >= factories.factoryResourcesIron[actualLevel + 1].money
      )
    case 'Gold':
      return (
        user.user.resources.gold >= factories.factoryResourcesGold[actualLevel + 1].gold &&
        user.user.money >= factories.factoryResourcesGold[actualLevel + 1].money
      )
    case 'Diamond':
      return (
        user.user.resources.diamond >= factories.factoryResourcesDiamond[actualLevel + 1].diamond &&
        user.user.money >= factories.factoryResourcesDiamond[actualLevel + 1].money
      )
    default:
      return ''
  }
}
</script>

<template>
  <main @click="handleClick">
    <div>
      <Modal :size="xs" v-if="isShowModal" @close="closeModal">
        <template #body>
          <div class="bg-white rounded-lg dark:bg-gray-700">
            <!-- Modal body -->
            <div class="p-6 space-y-6" style="padding-top: -10px">
              <!-- Close button -->
              <button
                @click="closeModal"
                type="button"
                class="float-right text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  class="w-3 h-3"
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
                <div class="mr-6 w-fit">
                  <img
                    class="w-32 h-auto border-2 border-solid rounded-lg text-center"
                    :class="borderColor(factoryData?.type)"
                    :src="factoryImage(factoryData?.type)"
                    alt="factory"
                  />
                </div>
                <div class="flex flex-col items-center justify-between h-32">
                  <h1 class="text-2xl font-bold">{{ factoryName(factoryData?.type) }}</h1>
                  <p class="text-sm text-gray-500">Lvl {{ factoryData?.level }} / 10</p>
                  <p class="text-md font-bold flex flex-row items-center">
                    {{ factoryData?.production }}
                    <img class="w-6 h-auto ml-2" :src="resourceImage(factoryData?.type)" />
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
                      <img
                        class="w-16 h-auto"
                        :src="resourceImage(factoryData?.type)"
                        alt="factory"
                      />
                    </div>
                    <div class="flex flex-row items-center justify-between h-16">
                      <p>
                        <span
                          class="font-bold"
                          :class="
                            actualResource(factoryData?.type) <
                            resourcesNeededForUpgrade(factoryData?.type, factoryData?.level)
                              ? `text-red-700`
                              : `text-green-700`
                          "
                        >
                          {{ actualResource(factoryData?.type) }}
                        </span>
                        / {{ resourcesNeededForUpgrade(factoryData?.type, factoryData?.level) }}
                      </p>
                    </div>
                  </div>
                  <div class="flex flex-row items-center justify-evenly">
                    <div class="mr-6 w-fit">
                      <img class="w-16 h-auto" :src="Coin" alt="coin" />
                    </div>
                    <div class="flex flex-row items-center justify-between h-16">
                      <p>
                        <span
                          class="font-bold"
                          :class="
                            user.user.money <
                            coinNeededForUpgrade(factoryData?.type, factoryData?.level)
                              ? `text-red-700`
                              : `text-green-700`
                          "
                        >
                          {{ user.user.money }}
                        </span>
                        / {{ coinNeededForUpgrade(factoryData?.type, factoryData?.level) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Divider -->
              <div class="w-full border-t-2 border-dashed border-black"></div>

              <!-- Indication for next level -->
              <div class="flex flex-col items-center justify-evenly mt-4 mb-4">
                <h2 class="text-xl font-bold">Level {{ factoryData?.level + 1 }} :</h2>
                <div>
                  <p class="flex flex-row items-center justify-between text-md font-bold">
                    {{ factoryData?.production * (factoryData?.level + 1) }}
                    <img class="w-6 h-auto ml-2" :src="resourceImage(factoryData?.type)" />
                    / h
                  </p>
                </div>
              </div>
              <button
                :data-popover-target="
                  !canUpgrade(factoryData?.type, factoryData?.level) ? `popover-default` : ``
                "
                type="button"
                class="w-full px-4 py-2 text-base font-medium text-center text-white transition duration-200 ease-in bg-green-700 rounded-lg shadow-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                :class="
                  !canUpgrade(factoryData?.type, factoryData?.level)
                    ? `cursor-not-allowed bg-red-700 hover:bg-red-900 focus:ring-red-500`
                    : ``
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
        </template>
      </Modal>
    </div>
    <div class="grid grid-cols-3 gap-3 p-10">
      <!-- Wood -->
      <FactoryColumn
        factoryName="Wood Factory"
        borderColor="border-wood"
        factoryImg="../../public/factories/wood_factory.png"
        factoryProductionImg="../../public/resources/wood.png"
        factory-type="Wood"
        @showModal="showModal"
      />
      <!--        @click="showModal"-->

      <!-- Coal -->
      <FactoryColumn
        factoryName="Coal Factory"
        borderColor="border-coal"
        factoryImg="../../public/factories/coal_factory.jpeg"
        factoryProductionImg="../../public/resources/coal.png"
        factory-type="Coal"
        @showModal="showModal"
      />

      <!-- Stone -->
      <FactoryColumn
        factoryName="Stone Factory"
        borderColor="border-stone"
        factoryImg="../../public/factories/stone_factory.jpeg"
        factoryProductionImg="../../public/resources/stone.png"
        factory-type="Stone"
        @showModal="showModal"
      />

      <div class="w-full border-t-2 border-dashed border-black"></div>
      <div class="w-full border-t-2 border-dashed border-black"></div>
      <div class="w-full border-t-2 border-dashed border-black"></div>

      <!-- Iron -->
      <FactoryColumn
        factoryName="Iron Factory"
        borderColor="border-iron"
        factoryImg="../../public/factories/iron_factory.png"
        factoryProductionImg="../../public/resources/iron_ingot.png"
        factory-type="Iron"
        @showModal="showModal"
      />

      <!-- Gold -->
      <FactoryColumn
        factoryName="Gold Factory"
        borderColor="border-gold"
        factoryImg="../../public/factories/gold_factory.png"
        factoryProductionImg="../../public/resources/gold_ingot.png"
        factory-type="Gold"
        @showModal="showModal"
      />

      <!-- Diamond -->
      <FactoryColumn
        factoryName="Diamond Factory"
        borderColor="border-diamond"
        factoryImg="../../public/factories/diamond_factory.jpeg"
        factoryProductionImg="../../public/resources/diamond.png"
        factory-type="Diamond"
        @showModal="showModal"
      />
    </div>
  </main>
</template>
