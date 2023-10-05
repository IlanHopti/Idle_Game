<script setup lang="ts">
import { ref, watch } from 'vue'
import Swal from 'sweetalert2'

import CoalResource from '../../public/resources/coal.png'
import IronResource from '../../public/resources/iron_ingot.png'
import WoodResource from '../../public/resources/wood.png'
import StoneResource from '../../public/resources/stone.png'
import CoinResource from '../../public/resources/coin-removebg-preview.png'
import DiamondResource from '../../public/resources/diamond.png'
import GoldResource from '../../public/resources/gold_ingot.png'

import { useMarketStore } from '@/stores/market'
import type { MarketInterface } from '@/types/market.interface'

import MarketplaceFilters from '@/components/marketplace/marketplaceFilters.vue'
import MarketlaceAddSell from '@/components/marketplace/marketplaceAddSell.vue'

const market = useMarketStore()

let marketList = ref<MarketInterface[]>([])
const type = ref('Wood')
const sort = ref('asc')

function updateType(newType: string) {
  type.value = newType
  onParamsChange(newType, sort.value)
}

// Fonction pour mettre à jour la valeur "sort" depuis le composant enfant
function updateSort(newSort: string) {
  sort.value = newSort
  onParamsChange(type.value, newSort)
}

// Function to change the params of the fetch by the filters
function onParamsChange(newType: string, newSort: string) {
  market.fetchMarket(newType, newSort).then(() => {
    marketList.value = market.market
  })
}

watch([type, sort], ([newType, newSort]) => {
  onParamsChange(newType, newSort)
})

// marketplace
market.fetchMarket(type.value, sort.value).then(() => {
  marketList.value = market.market
})

watch(market, () => {
  marketList.value = market.market
})

function image(key: string) {
  switch (key) {
    case 'wood':
      return WoodResource
    case 'stone':
      return StoneResource
    case 'coin':
      return CoinResource
    case 'coal':
      return CoalResource
    case 'diamond':
      return DiamondResource
    case 'gold':
      return GoldResource
    case 'iron':
      return IronResource
    default:
      return ''
  }
}

function upgradeQtyRender(qty: number) {
  const suffixes = ['', 'K', 'M', 'B', 'T'] // Suffixes for thousands, millions, billions, trillions, etc.
  let index = 0

  while (qty >= 1000 && index < suffixes.length - 1) {
    qty /= 1000
    index++
  }

  return qty.toFixed(1) + suffixes[index]
}

const buyArticle = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will buy this article',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, buy it!',
    cancelButtonText: 'No, cancel!',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Bought!', 'Your article has been bought.', 'success')
    }
  })
}
</script>

<template>
  <!-- buttons -->
  <div class="text-center my-10">
    <button
      type="button"
      data-drawer-target="drawer-example"
      data-drawer-show="drawer-example"
      aria-controls="drawer-example"
      class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
    >
      <span
        class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
      >
        Show filters
      </span>
    </button>
    <button
      data-modal-target="authentication-modal"
      data-modal-toggle="authentication-modal"
      class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
      type="button"
    >
      <span
        class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
      >
        Add a sell
      </span>
    </button>
  </div>

  <!-- add sell toggle -->
  <MarketlaceAddSell :type="type" :sort="sort" :market="market" />

  <!-- filters component -->
  <MarketplaceFilters :type="type" :sort="sort" @updateType="updateType" @updateSort="updateSort" />

  <!-- marketplace -->
  <div class="grid grid-cols-4 gap-5">
    <div v-for="item in marketList">
      <div
        class="flex flex-col justify-center items-center border-2 border-solid rounded-lg w-32 pl-6 pr-6 m-auto"
        :class="`border-${item.resource.toLowerCase()}`"
      >
        <img class="w-20 h-auto" :src="image(item.resource.toLowerCase())" alt="wood" />
        <div class="text-xl font-bold">{{ item.quantity }}</div>

        <button
          type="button"
          :onclick="buyArticle"
          class="flex flex-row items-center text-sm hover:text-white border font-medium rounded-lg pl-5 pr-8 py-2.5 text-center my-2"
          :class="`border-${item.resource.toLowerCase()} hover:bg-${item.resource.toLowerCase()} `"
        >
          <span class="font-bold">{{ upgradeQtyRender(item.price) }}</span>
          <img class="w-5" :src="CoinResource" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>
