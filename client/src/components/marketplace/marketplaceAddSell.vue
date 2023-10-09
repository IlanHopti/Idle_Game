<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useMarketStore } from '@/stores/market'

const user = useUserStore()
const market = useMarketStore()

const props = defineProps<{
  type: string
  sort: string
}>()

const type = ref(props.type)
const sort = ref(props.sort)

const formData = ref({
  type: 'Wood',
  quantity: 0,
  price: 0
})

function addArticle() {
  type.value = formData.value.type

  const article = {
    resource: formData.value.type,
    quantity: formData.value.quantity,
    price: formData.value.price,
    seller_id: user.user._id.toString()
  }

  market.addArticle(article, formData.value.type, sort.value).then(() => {
    formData.value.type = 'Wood'
    formData.value.quantity = 0
    formData.value.price = 0

    const authenticationModal = document.querySelector(
      '[data-modal-hide="authentication-modal"]'
    ) as HTMLElement
    if (authenticationModal) {
      authenticationModal.click()
    }
  })
}

function calculateFee() {
  return formData.value.price - formData.value.price * 0.03
}
</script>

<template>
  <div
    id="authentication-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="authentication-modal"
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
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a Sell</h3>

          <form @submit.prevent="addArticle" class="space-y-6" action="#">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your resource
              </label>
              <select
                v-model="formData.type"
                name="type"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-gray-300"
              >
                <option selected value="Wood">Wood</option>
                <option value="Coal">Coal</option>
                <option value="Stone">Stone</option>
                <option value="Iron">Iron</option>
                <option value="Gold">Gold</option>
                <option value="Diamond">Diamond</option>
              </select>
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Quantity
              </label>
              <input
                v-model="formData.quantity"
                type="number"
                name="quantity"
                placeholder="1"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                v-model="formData.price"
                type="number"
                name="price"
                id="quantity"
                placeholder="1"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              <div class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                🚨 Warning: We will deduct 3% as a fee from the final price, resulting in
                {{ calculateFee() }} coins.
              </div>
            </div>

            <button
              type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sell Product
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
