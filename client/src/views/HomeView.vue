<script setup lang="ts">
import FactoryColumn from '../components/factoriesColumn.vue'
import { Modal } from 'flowbite-vue'
import { ref } from 'vue'
import { useFactoriesStore } from '@/stores/factories'
import { useUserStore } from '@/stores/user'
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
</script>

<template>
  <main>
    <div>
      <!--      <Modal :size="'xs'" v-if="isShowModal" @close="closeModal">
        <template #header>
          <div class="flex items-center text-lg">Terms of Service</div>
        </template>
        <template #body>
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            With less than a month to go before the European Union enacts new consumer privacy laws
            for its citizens, companies around the world are updating their terms of service
            agreements to comply.
            {{ factoryData }}
            {{ factoryData?.type }}
          </p>
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on
            May 25 and is meant to ensure a common set of data rights in the European Union. It
            requires organizations to notify users as soon as possible of high-risk data breaches
            that could personally affect them.
          </p>
        </template>
        <template #footer>
          <div class="flex justify-between">
            <button
              @click="closeModal"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Decline
            </button>
            <button
              @click="closeModal"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
          </div>
        </template>
      </Modal>-->
      <Modal :size="'xs'" v-if="isShowModal" @close="closeModal">
        <template #header>
          <div class="flex items-center text-lg">Terms of Service</div>
        </template>
        <template #body>
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <!-- Close button -->
              <button
                type="button"
                class="float-right text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                <div class="mr-6 w-fit">
                  <img
                    class="w-32 h-auto border-2 border-solid rounded-lg text-center"
                    :class="borderColor"
                    :src="factoryImg"
                  />
                </div>
                <div class="flex flex-col items-center justify-between h-32">
                  <h1 class="text-2xl font-bold">{{ factoryName }}</h1>
                  <p class="text-sm text-gray-500">
                    Lvl {{ factoryLevel }} / {{ factoryLevelMax }}
                  </p>
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
                            user.user.resources.wood < /*unitsNeededForUpgrade.wood*/ 12
                              ? `text-red-700`
                              : `text-green-700`
                          "
                        >
                          {{ user.user.resources.wood }}
                        </span>
                        / 12
                        <!--                        / {{ unitsNeededForUpgrade.wood }}-->
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
                            user.user.money < /*unitsNeededForUpgrade.coin*/ 100
                              ? `text-red-700`
                              : `text-green-700`
                          "
                        >
                          {{ user.user.money }}
                        </span>
                        / 100
                        <!--                        / {{ unitsNeededForUpgrade.coin }}-->
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
                  !canUpgrade
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
        <template #footer>
          <div class="flex justify-between">
            <button
              @click="closeModal"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Decline
            </button>
            <button
              @click="closeModal"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
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
