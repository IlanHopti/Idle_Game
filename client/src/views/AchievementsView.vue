<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-24 mt-10">
    <div
      v-for="success in successes"
      :key="success.id"
      :style="{
        'background-color': success.achieved ? 'rgba(226, 226, 226)' : 'rgba(130, 130, 130, 0.2)',
        filter: success.achieved ? 'brightness(1.2)' : 'brightness(0.6)'
      }"
      :class="
        'rounded-lg overflow-hidden shadow w-4/5' +
        (success.achieved ? ' border-2 border-green-600' : ' border-2 border-gray-100 ')
      "
    >
      <div class="p-6">
        <p class="text-lg font-semibold text-gray-800">{{ success.title }}</p>
        <p
          class="mt-2"
          :class="{ 'text-green-600': success.achieved, 'text-gray-600': !success.achieved }"
        >
          {{ success.achieved ? 'Achieved' : 'Locked' }}
        </p>
        <p class="text-gray-600 mt-2">{{ success.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAchievementsStore } from '@/stores/achievements'
import {onBeforeMount, onErrorCaptured, onMounted, ref, watch} from 'vue'
import router from "@/router";
import {useUserStore} from "@/stores/user";

onMounted(async () => {
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

const user = useUserStore()
onBeforeMount(() => {
    user.isLogged ? '' : router.push('/login')
})

let successes = ref([])
let achievedSuccess = ref([])

let achievementsStore = useAchievementsStore()
onBeforeMount(async () => {
  await achievementsStore.fetchAllAchievements().then(() => {
    successes.value = achievementsStore.success
  })

  await achievementsStore.fetchFinishedAchievements().then(() => {
    achievedSuccess.value = achievementsStore.achievedSuccess
  })

  successes.value.forEach((success) => {
    achievedSuccess.value.forEach((achieved) => {
      if (success._id === achieved._id) {
        success.achieved = true
      }
    })
  })
})
</script>
