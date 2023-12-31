<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import CoalResource from '../../public/resources/coal.png'
import IronResource from '../../public/resources/iron_ingot.png'
import WoodResource from '../../public/resources/wood.png'
import StoneResource from '../../public/resources/stone.png'
import CoinResource from '../../public/resources/coin.jpeg'
import DiamondResource from '../../public/resources/diamond.png'
import GoldResource from '../../public/resources/gold_ingot.png'
import { onBeforeUnmount, onErrorCaptured, onMounted, ref, watch } from 'vue'

const userConnected = useUserStore()
const resources = ref({})

let interval = null

onMounted(async () => {
  const unwatchResources = watch(
    () => userConnected.resources,
    (newValue) => {
      resources.value = newValue
    }
  )

  const unwatchMoney = watch(
    () => userConnected.money,
    (newValue) => {
      resources.value.coin = newValue
    }
  )

  interval = setInterval(async () => {
    try {
      await userConnected.redeemResources('automatic')
    } catch (err) {
      console.log('Error redeeming resources:')
    }
  }, 3000)

  onErrorCaptured(() => {
    unwatchResources()
    unwatchMoney()
  })

  try {
    await userConnected.getOfflineResources()
  } catch (err) {
    console.log('Error getting offline resources:')
  }
})

onBeforeUnmount(() => {
  clearInterval(interval)
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
</script>

<template>
  <div class="w-1/2 m-auto flex justify-between rounded p-2 flex flex-row">
    <div class="mr-5" v-for="(quantity, key) in resources" :key="key">
      <p v-if="quantity > 0" class="text-white flex items-center space-x-1">
        <img :src="image(key)" class="w-8 h-8" />
        <span class="font-bold text-blue-400">{{ upgradeQtyRender(quantity) }}</span>
      </p>
    </div>
  </div>
</template>
