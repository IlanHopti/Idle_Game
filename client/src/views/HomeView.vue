<script setup lang="ts">
import FactoryColumn from '../components/factoriesColumn.vue'
import { Modal } from 'flowbite-vue'
import { onBeforeMount, onErrorCaptured, onMounted, ref, watch } from 'vue'
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
import router from '@/router'

import Swal from 'sweetalert2'

const factories = useFactoriesStore()
const user = useUserStore()

let factoryData: object | undefined = ref({})
let factoryResources: object | undefined | unknown = ref({})
let userStore = useUserStore()

const isShowModal = ref(false)
function closeModal() {
  isShowModal.value = false
}
function showModal(id: string) {
  factoryData = factories.getFactory(id)
  console.log(factoryData)
  // console.log(factories.getFactory(id))
  isShowModal.value = true
}

onMounted(async () => {
  user.fetchUser().then(() => {
    user.isLogged ? '' : router.push('/login')
  })

  const unwatchIsLogged = watch(
    () => userStore.isLogged,
    (newValue) => {
      if (!newValue) {
        router.push('/login')
      }
    }
  )

  onErrorCaptured(() => {
    unwatchIsLogged()
  })
})

const handleClick = (e: Event) => {
  if (useUserStore().user.length !== 0) {
    useUserStore().redeemResources()
  }
}
onBeforeMount(() => {
  factories.getFactoryAllResources().then(() => {
    factoryResources = factories.factoryResources
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
    case 'wood':
      return WoodResource
    case 'stone':
      return StoneResource
    case 'coal':
      return CoalResource
    case 'iron':
      return IronResource
    case 'gold':
      return GoldResource
    case 'diamond':
      return DiamondResource
    case 'money':
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
    case 'wood':
      return user.user.resources.wood
    case 'stone':
      return user.user.resources.stone
    case 'coal':
      return user.user.resources.coal
    case 'iron':
      return user.user.resources.iron
    case 'gold':
      return user.user.resources.gold
    case 'diamond':
      return user.user.resources.diamond
    case 'money':
      return user.user.money
    default:
      return ''
  }
}

function resourcesNeededForUpgrade(type: string, actualLevel: number) {
  let resources = ref([])
  switch (type) {
    case 'Wood':
      for (const [key, value] of Object.entries(factories.factoryResourcesWood[actualLevel + 1])) {
        resources.value.push(`${key}: ${value}`)
      }
      return resources.value
    case 'Stone':
      for (const [key, value] of Object.entries(factories.factoryResourcesStone[actualLevel + 1])) {
        resources.value.push(`${key}: ${value}`)
      }
      return resources.value
    case 'Coal':
      for (const [key, value] of Object.entries(factories.factoryResourcesCoal[actualLevel + 1])) {
        resources.value.push(`${key}: ${value}`)
      }
      return resources.value
    case 'Iron':
      for (const [key, value] of Object.entries(factories.factoryResourcesIron[actualLevel + 1])) {
        resources.value.push(`${key}: ${value}`)
      }
      return resources.value
    case 'Gold':
      for (const [key, value] of Object.entries(factories.factoryResourcesGold[actualLevel + 1])) {
        resources.value.push(`${key}: ${value}`)
      }
      return resources.value
    case 'Diamond':
      for (const [key, value] of Object.entries(
        factories.factoryResourcesDiamond[actualLevel + 1]
      )) {
        resources.value.push(`${key}: ${value}`)
      }
      return resources.value
    default:
      return resources
  }
}

function canUpgrade(type: string, actualLevel: number) {
  switch (type) {
    case 'Wood':
      for (const [key, value] of Object.entries(factories.factoryResourcesWood[actualLevel + 1])) {
        if (key === 'money' && user.user.money < value) {
          return false
        }
        if (user.user.resources[key] < value) {
          return false
        }
      }
      return true
    case 'Stone':
      for (const [key, value] of Object.entries(factories.factoryResourcesStone[actualLevel + 1])) {
        if (key === 'money' && user.user.money < value) {
          return false
        }
        if (user.user.resources[key] < value) {
          return false
        }
      }
      return true
    case 'Coal':
      for (const [key, value] of Object.entries(factories.factoryResourcesCoal[actualLevel + 1])) {
        if (key === 'money' && user.user.money < value) {
          return false
        }
        if (user.user.resources[key] < value) {
          return false
        }
      }
      return true
    case 'Iron':
      for (const [key, value] of Object.entries(factories.factoryResourcesIron[actualLevel + 1])) {
        if (key === 'money' && user.user.money < value) {
          return false
        }
        if (user.user.resources[key] < value) {
          return false
        }
      }
      return true
    case 'Gold':
      for (const [key, value] of Object.entries(factories.factoryResourcesGold[actualLevel + 1])) {
        if (key === 'money' && user.user.money < value) {
          return false
        }
        if (user.user.resources[key] < value) {
          return false
        }
      }
      return true
    case 'Diamond':
      for (const [key, value] of Object.entries(
        factories.factoryResourcesDiamond[actualLevel + 1]
      )) {
        if (key === 'money' && user.user.money < value) {
          return false
        }
        if (user.user.resources[key] < value) {
          return false
        }
      }
      return true
    default:
      return ''
  }
}

function errorUpgrade() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: "You don't have enough resources"
  })
}

function successUpgrade() {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: 'You have successfully upgraded your factory'
  })
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
                  <p class="lg:text-sm text-gray-500">Lvl {{ factoryData?.level }} / 10</p>
                  <p class="text-md font-bold flex flex-row items-center">
                    {{ factoryData?.production * factoryData?.level }}
                    <img
                      class="w-6 h-auto ml-2"
                      :src="resourceImage(factoryData?.type.toLowerCase())"
                      alt="resources"
                    />
                    / 3s
                  </p>
                </div>
              </div>
              <!--  if the factory is max level -->
              <div
                v-if="factoryData?.level >= 10"
                class="flex items-center text-center justify-center pt-4"
              >
                Your factory is at MAX level !
              </div>
              <div v-else>
                <!-- Divider -->
                <div class="w-full border-t-2 border-dashed border-black"></div>

                <!-- Units for upgrade -->
                <div class="flex flex-row items-center justify-center mt-4 mb-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div
                      v-for="resource in resourcesNeededForUpgrade(
                        factoryData?.type,
                        factoryData?.level
                      )"
                      :key="resource"
                      class="flex flex-col items-center justify-center"
                    >
                      <p class="text-md font-bold m-3">
                        <span
                          class="font-bold"
                          :class="
                            actualResource(resource.split(':')[0]) < resource.split(':')[1]
                              ? `text-red-700`
                              : `text-green-700`
                          "
                        >
                          {{ actualResource(resource.split(':')[0]) }}
                        </span>
                        / {{ resource.split(':')[1] }}
                      </p>
                      <img
                        :src="resourceImage(resource.split(':')[0])"
                        class="w-12 h-auto"
                        alt="resource"
                      />
                    </div>
                  </div>
                </div>

                <!-- Divider -->
                <div class="w-full border-t-2 border-dashed border-black"></div>

                <!-- Indication for next level -->
                <div class="flex flex-col items-center justify-evenly mt-4 mb-4">
                  <h2 class="text-xl font-bold">Level {{ factoryData?.level + 1 }} :</h2>
                  <div>
                    <p class="flex flex-row items-center justify-between lg:text-sm font-bold">
                      {{ (factoryData?.production * (factoryData?.level + 1)).toFixed(2) }}
                      <img
                        class="w-8 h-auto ml-1 mr-1"
                        :src="resourceImage(factoryData?.type.toLowerCase())"
                        alt="resource"
                      />
                      / 3s
                    </p>
                  </div>
                </div>
                <button
                  :data-popover-target="
                    !canUpgrade(factoryData?.type, factoryData?.level) ? `popover-default` : ``
                  "
                  @click="
                    canUpgrade(factoryData?.type, factoryData?.level)
                      ? factories
                          .upgradeFactory(factoryData?._id)
                          .then(() => closeModal(), successUpgrade())
                      : errorUpgrade()
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
        :factoryUpgrade="factoryResources"
        @showModal="showModal"
      />

      <!-- Coal -->
      <FactoryColumn
        factoryName="Coal Factory"
        borderColor="border-coal"
        factoryImg="../../public/factories/coal_factory.jpeg"
        factoryProductionImg="../../public/resources/coal.png"
        factory-type="Coal"
        :factoryUpgrade="factoryResources"
        @showModal="showModal"
      />

      <!-- Stone -->
      <FactoryColumn
        factoryName="Stone Factory"
        borderColor="border-stone"
        factoryImg="../../public/factories/stone_factory.jpeg"
        factoryProductionImg="../../public/resources/stone.png"
        factory-type="Stone"
        :factoryUpgrade="factories.factoryResources"
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
        :factoryUpgrade="factories.factoryResources"
        @showModal="showModal"
      />

      <!-- Gold -->
      <FactoryColumn
        factoryName="Gold Factory"
        borderColor="border-gold"
        factoryImg="../../public/factories/gold_factory.png"
        factoryProductionImg="../../public/resources/gold_ingot.png"
        factory-type="Gold"
        :factoryUpgrade="factories.factoryResources"
        @showModal="showModal"
      />

      <!-- Diamond -->
      <FactoryColumn
        factoryName="Diamond Factory"
        borderColor="border-diamond"
        factoryImg="../../public/factories/diamond_factory.jpeg"
        factoryProductionImg="../../public/resources/diamond.png"
        factory-type="Diamond"
        :factoryUpgrade="factories.factoryResources"
        @showModal="showModal"
      />
    </div>
  </main>
</template>
