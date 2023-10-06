<script setup lang="ts">
import { onErrorCaptured, onMounted, ref, watch } from 'vue'
import Swal from 'sweetalert2'

import CoalResource from '../../public/resources/coal.png'
import IronResource from '../../public/resources/iron_ingot.png'
import WoodResource from '../../public/resources/wood.png'
import StoneResource from '../../public/resources/stone.png'
import CoinResource from '../../public/resources/coin-removebg-preview.png'
import DiamondResource from '../../public/resources/diamond.png'
import GoldResource from '../../public/resources/gold_ingot.png'

import { useMarketStore } from '@/stores/market'
import { useUserStore } from '@/stores/user'
import type { MarketInterface } from '@/types/market.interface'

import MarketplaceFilters from '@/components/marketplace/marketplaceFilters.vue'
import MarketlaceAddSell from '@/components/marketplace/marketplaceAddSell.vue'
import MarketplaceFastSell from '@/components/marketplace/marketplaceFastSell.vue'
import router from '@/router'

import { Modal } from 'flowbite-vue'

const isShowModal = ref(false)
function closeModal() {
  isShowModal.value = false
}
let modalIndex = ref(0)
let modalQuantity = ref(0)
let modalPrice = ref(0)
let modalResource = ref('')
let modalId = ref('')
let itemModal = ref<MarketInterface>()

function showModal(
  index: number,
  quantity: number,
  price: number,
  resource: string,
  id: string,
  item: MarketInterface
) {
  console.log(index)
  console.log(quantity)
  console.log(price)
  console.log(resource)
  modalIndex.value = index
  modalQuantity.value = quantity
  modalPrice.value = price
  modalResource.value = resource
  modalId.value = id
  isShowModal.value = true
  itemModal.value = item
}

const market = useMarketStore()
const user = useUserStore()

let marketList = ref<MarketInterface[]>([])
const type = ref('Wood')
const sort = ref('asc')
const owner = ref('Other')

onMounted(async () => {
  user.fetchUser().then(() => {
    user.isLogged ? '' : router.push('/login')
  })

  const unwatchIsLogged = watch(
    () => user.isLogged,
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

function updateType(newType: string) {
  type.value = newType
  onParamsChange(newType, sort.value)
}

// Fonction pour mettre à jour la valeur "sort" depuis le composant enfant
function updateSort(newSort: string) {
  sort.value = newSort
  onParamsChange(type.value, newSort)
}

function updateOwner(newOwner: string) {
  owner.value = newOwner
  // add filter by owner on market
  marketList.value = market.market.filter((item) => {
    if (newOwner === 'Me') {
      return item.seller_id === user.user._id.toString()
    } else {
      return item.seller_id !== user.user._id.toString()
    }
  })
}

// Function to change the params of the fetch by the filters
function onParamsChange(newType: string, newSort: string) {
  market.fetchMarket(newType, newSort).then(() => {
    marketList.value = market.market
    updateOwner(owner.value)
  })
}

watch([type, sort], ([newType, newSort]) => {
  onParamsChange(newType, newSort)
})

// marketplace
market.fetchMarket(type.value, sort.value).then(() => {
  marketList.value = market.market
  updateOwner(owner.value)
})

// watch the market to update the list with updateOwner function
watch(market, () => {
  marketList.value = market.market
  updateOwner(owner.value)
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

const buyArticle = (item: MarketInterface | undefined) => {
  if (item?.seller_id === user.user._id.toString()) {
    Swal.fire({
      title: 'Remove Sell',
      text: 'Do you want to remove this sell?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed && item?._id) {
        market.removeArticle(item?._id, type.value).then(() => {
          Swal.fire({
            title: 'Success',
            text: 'You have successfully removed the article',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          closeModal()
        })
      }
    })
    return
  }

  market.buyArticle(item?._id, quantity.value, type.value).then(() => {
    Swal.fire({
      title: 'Success',
      text: 'You have successfully bought the article',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
    closeModal()
  })
}

let quantity = ref(0)
let price = ref(0)

function calculateFee(totalQuantity: number, totalPrice: number) {
  return ((quantity.value * totalPrice) / totalQuantity).toFixed(2)
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
    <button
      data-modal-target="fast-modal"
      data-modal-toggle="fast-modal"
      class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
      type="button"
    >
      <span
        class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
      >
        Fast Sell
      </span>
    </button>
  </div>

  <Modal v-if="isShowModal" @close="closeModal">
    <template #body>
      <p
        class="flex flex-row items-center justify-center text-base leading-relaxed text-gray-500 dark:text-gray-400"
      >
        How many {{ modalResource }} do you want to buy ?
      </p>
      <input
        v-model="quantity"
        type="number"
        name="price"
        id="quantity"
        placeholder="1"
        min="1"
        :max="modalQuantity"
        class="bg-gray-50 my-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        required
      />
      <div
        class="flex flex-row items-center justify-center text-center text-lg text-gray-600 dark:text-gray-300"
      >
        {{ calculateFee(modalQuantity, modalPrice) }}
        <img class="w-10 mr-1" :src="CoinResource" alt="" />
      </div>
    </template>
    <template #footer>
      <div class="flex justify-evenly">
        <button
          @click="closeModal"
          type="button"
          class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Cancel
        </button>
        <button
          @click="buyArticle(itemModal)"
          type="button"
          class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Buy
        </button>
      </div>
    </template>
  </Modal>
  <!-- add sell toggle -->
  <MarketlaceAddSell :type="type" :sort="sort" :market="market" />

  <MarketplaceFastSell :type="type" :sort="sort" :market="market" />

  <!-- filters component -->
  <MarketplaceFilters
    :type="type"
    :sort="sort"
    :owner="owner"
    @updateType="updateType"
    @updateSort="updateSort"
    @update-owner="updateOwner"
  />

  <!-- marketplace -->
  <div class="grid grid-cols-4 gap-5">
    <div v-for="(item, index) in marketList">
      <div
        class="flex flex-col justify-center items-center border-2 border-solid rounded-lg w-32 pl-6 pr-6 m-auto"
        :class="`border-${item.resource.toLowerCase()}`"
      >
        <img class="w-20 h-auto" :src="image(item.resource.toLowerCase())" alt="wood" />
        <div class="text-xl font-bold">{{ item.quantity }}</div>

        <button
          type="button"
          @click="
            showModal(
              index,
              item.quantity,
              item.price,
              item.resource.toLowerCase(),
              <string>item?._id,
              item
            )
          "
          class="flex flex-row items-center text-sm border font-medium rounded-lg pl-5 pr-8 py-2.5 text-center my-2"
          :class="`border-${item.resource.toLowerCase()} `"
        >
          <span class="font-bold">{{ upgradeQtyRender(item.price) }}</span>
          <img class="w-5" :src="CoinResource" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>
