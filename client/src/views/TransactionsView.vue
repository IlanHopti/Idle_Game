<template>
  <div class="relative overflow-x-auto">
    <table class="w-2/3 m-auto mt-12 text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-center text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Seller Name</th>
          <th scope="col" class="px-6 py-3">Buyer Name</th>
          <th scope="col" class="px-6 py-3">Resource Exchanged</th>
          <th scope="col" class="px-6 py-3">Quantity</th>
          <th scope="col" class="px-6 py-3">Price</th>
          <th scope="col" class="px-6 py-3">Money Received</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="transaction in transactions" :key="transaction.id">
          <td class="py-2 px-4">{{ transaction.seller_id.username }}</td>
          <td class="py-2 px-4">{{ transaction.buyer_id.username }}</td>
          <td class="py-2 px-4">{{ transaction.resource }}</td>
          <td class="py-2 px-4">{{ transaction.quantity }}</td>
          <td class="py-2 px-4">{{ transaction.price }}</td>
          <td class="py-2 px-4">{{ transaction.price - (3 / 100) * transaction.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, computed, onMounted, watch, onErrorCaptured } from 'vue'
import { useUserStore } from '@/stores/user'

let transactions = ref([])
let userStore = useUserStore()

onMounted(() => {
  const unwatchTransactions = watch(
    () => userStore.transactions,
    (newValue) => {
      transactions.value = newValue
    }
  )

  // Clean up the watcher when the component is unmounted
  onErrorCaptured(() => {
    unwatchTransactions()
  })
})

onBeforeMount(async () => {
  await userStore.fetchAllTransactions().then(() => {
    transactions.value = userStore.transactions
  })
})
</script>
