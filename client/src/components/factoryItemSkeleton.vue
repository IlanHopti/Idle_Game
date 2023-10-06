<script setup lang="ts">
import Swal from 'sweetalert2'
import { ref, defineProps, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'
import { useFactoriesStore } from '@/stores/factories'
const user = useUserStore()
const factories = useFactoriesStore()

const props = defineProps<{
  factoryName: string
  factoryType: string
}>()

// const myUnits = ref({ coin: 100, iron: 20 })
// const unitsNeededForBuy = ref({ coin: 100, iron: 50 })
const canBuy = ref(false)

const coinClass = ref('text-green-700')
const ironClass = ref('text-green-700')

// watchEffect(() => {
//   if (myUnits.value.coin < unitsNeededForBuy.value.coin) {
//     coinClass.value = 'text-red-700'
//     canBuy.value = false
//   } else {
//     coinClass.value = 'text-green-700'
//   }
//
//   if (myUnits.value.iron < unitsNeededForBuy.value.iron) {
//     ironClass.value = 'text-red-700'
//     canBuy.value = false
//   } else {
//     ironClass.value = 'text-green-700'
//   }
// })
console.log('zzzzzzzzzzzz')
console.log(props.factoryType)

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
    case 'coin':
      return CoinResource
  }
}

// function resourcesNeeded(type: string) {
//   switch (type) {
//     case 'wood':
//       return 100
//     case 'stone':
//       return 100
//     case 'coal':
//       return 100
//     case 'iron':
//       return 100
//     case 'gold':
//       return 100
//     case 'diamond':
//       return 100
//     case 'coin':
//       return 100
//   }
// }
let unitsNeededForBuy = ref({})
factories.factoryResources.forEach((factoryResource) => {
  if (factoryResource.type == props.factoryType) {
    // console.log(factoryResource.resources[0])
    unitsNeededForBuy.value = factoryResource.resources[0]
    // console.log(unitsNeededForBuy.value)
    // unitsNeededForBuy.value.coin = factoryResource.cost.coin
    // unitsNeededForBuy.value.iron = factoryResource.cost.iron
  }
})
console.log(unitsNeededForBuy.value)
const buyFactory = () => {
  // Préparez le contenu que vous souhaitez afficher dans la boîte de dialogue Swal
  let contentHtml = `<div class="flex flex-row items-center justify-evenly mt-4 mb-4">`

  for (const key in user.resources) {
    const quantity = user.resources[key]
    console.log(quantity)
    contentHtml += `
    <div class="flex flex-col items-center justify-evenly">
      <div class="flex flex-row items-center justify-evenly">
        <div class="mr-6 w-fit">
          <img class="w-16 h-auto" src="../../../public/resources/coin.jpeg" />
        </div>
        <div class="flex flex-row items-center justify-between h-16">
          <p>
            <span class="font-bold ${
              user.user.money < unitsNeededForBuy.value.coin ? 'text-red-700' : 'text-green-700'
            }">
              ${user.user.money}
            </span>
            / ${unitsNeededForBuy.value.coin}
          </p>
        </div>
      </div>
    </div>`
  }

  contentHtml += '</div>'

  // Affichez la boîte de dialogue Swal avec le contenu préparé
  Swal.fire({
    title: `Buy a ${props.factoryName} ?`,
    html: contentHtml,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      if (canBuy.value) {
        Swal.fire({
          title: 'Factory Bought!',
          text: 'You have successfully bought a factory!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
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
<!--<div class="flex flex-row items-center justify-evenly">
<div class="mr-6 w-fit">
  <img
    class="w-16 h-auto"
    src="../../../public/resources/iron_ingot.png"
  />
</div>
<div class="flex flex-row items-center justify-between h-16">
  <p>
                  <span
                    class="font-bold ${
                      user.resources.iron < unitsNeededForBuy.value.iron
                        ? `text-red-700`
                        : `text-green-700`
                    }"

                  >
                    ${user.resources.iron}
                  </span>
    / ${unitsNeededForBuy.value.iron}
  </p>
</div>
</div>-->
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
