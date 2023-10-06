<script setup lang="ts">
import Swal from 'sweetalert2'
import { ref, defineProps } from 'vue'
import CoalResource from '../../public/resources/coal.png'
import IronResource from '../../public/resources/iron_ingot.png'
import WoodResource from '../../public/resources/wood.png'
import StoneResource from '../../public/resources/stone.png'
import CoinResource from '../../public/resources/coin.jpeg'
import DiamondResource from '../../public/resources/diamond.png'
import GoldResource from '../../public/resources/gold_ingot.png'
import { useUserStore } from '@/stores/user'
import { useFactoriesStore } from '@/stores/factories'
const user = useUserStore()
const factories = useFactoriesStore()

const props = defineProps<{
  factoryName: string
  factoryType: string
}>()

function canBuy() {
  let canBuy = true
  factories.factoryResources.forEach((factoryResource) => {
    if (factoryResource.type == props.factoryType) {
      for (const key in factoryResource.resources[0]) {
        if (factoryResource.resources[0][key] > user.resources[key]) {
          canBuy = false
        }
      }
    }
  })
  return canBuy
}
function image(key: string) {
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
  }
}

let unitsNeededForBuy = ref({})
if (factories.factoryResources.length == 0) {
  console.log('fetching resources')
  factories.getFactoryAllResources().then(() => {
    factories.factoryResources.forEach((factoryResource) => {
      if (factoryResource.type == props.factoryType) {
        unitsNeededForBuy.value = factoryResource.resources[0]
        console.log('fetching resources')
      }
    })
  })
}
const buyFactory = () => {
  let contentHtml = `<div class="flex flex-row items-center justify-evenly mt-4 mb-4">`

  for (const key in unitsNeededForBuy.value) {
    if (unitsNeededForBuy.value[key] === 0) continue
    const quantity = unitsNeededForBuy.value[key]
    const resource = key === 'money' ? user.resources['coin'] : user.resources[key]
    const isEnough = resource >= quantity
    const resourceClass = isEnough ? 'text-green-700' : 'text-red-700'

    contentHtml += `
    <div class="flex flex-col items-center justify-evenly">
      <div class="flex flex-row items-center justify-evenly">
        <div class="mr-6 w-fit">
          <img class="w-16 h-auto" src="${image(key)}" />
        </div>
        <div class="flex flex-row items-center justify-between h-16">
          <span class="font-bold ${resourceClass}">
              ${resource}
            </span>
            / ${quantity}
          </p>
      </div>
    </div>`
  }

  contentHtml += '</div>'

  Swal.fire({
    title: `Buy a ${props.factoryName} ?`,
    html: contentHtml,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      if (canBuy()) {
        Swal.fire({
          title: 'Factory Bought!',
          text: 'You have successfully bought a factory!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        factories.createFactory(props.factoryType)
      } else {
        Swal.fire({
          title: 'Not enough resources!',
          text: 'You do not have enough resources to buy a factory!',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    }
  })
}
</script>
<template>
  <main>
    <div
      class="w-full border-2 border-dashed border-gray-200 rounded-3xl p-6 mt-6 mb-6 text-center flex flex-row items-center justify-start"
    >
      <div
        class="border-2 border-dashed border-gray-200 rounded-lg p-3 text-center mr-6"
        :onclick="buyFactory"
      >
        +
      </div>
      <div class="flex flex-col justify-center w-full">
        <div class="flex flex-row justify-between">
          <div>{{ factoryName }}</div>
          <div>Lvl 0</div>
        </div>
        <div class="w-full h-1 bg-black rounded-lg mt-2"></div>
      </div>
    </div>
  </main>
</template>
