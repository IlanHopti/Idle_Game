<script setup lang="ts">
import { ref } from 'vue'
import FactoryItem from '../components/factoryItem.vue'
import FactoryItemSkeleton from '../components/factoryItemSkeleton.vue'
import { useUserStore } from '@/stores/user'
import { useFactoriesStore } from '@/stores/factories'

const props = defineProps<{
  factoryName: string
  borderColor: string
  factoryImg: string
  factoryProductionImg: string
  factoryType: string
}>()

const userConnected = useUserStore()
const factories = useFactoriesStore()
let notOwnedFactories = ref(0)

if (userConnected.user.length == 0) {
  console.log('fetching user')
  userConnected.fetchUser().then(() => {
    factories.fetchFactory().then(() => {
      factories.factories.forEach((factory) => {
        if (factory.type == props.factoryType) {
          notOwnedFactories.value++
        }
      })
    })
  })
}
const emit = defineEmits(['showModal'])

const openModal = (id: string) => {
  emit('showModal', id)
}
</script>

<template>
  <div class="flex flex-col">
    <div v-if="factories.factories.length == 0 || false" class="flex flex-col">
      <FactoryItemSkeleton :factory-name="factoryName" />
      <FactoryItemSkeleton :factory-name="factoryName" />
      <FactoryItemSkeleton :factory-name="factoryName" />
      <FactoryItemSkeleton :factory-name="factoryName" />
    </div>
    <div v-else class="flex flex-col">
      <div v-for="factory in factories?.factories">
        <template v-if="factory?.type === props.factoryType">
          <FactoryItem
            :factory-name="factoryName"
            :factory-level="factory?.level"
            :borderColor="borderColor"
            :factory-img="factoryImg"
            @click="openModal(factory?._id)"
          />
        </template>
      </div>
      <div v-for="n in 4 - notOwnedFactories">
        <FactoryItemSkeleton :factory-name="factoryName" />
      </div>
    </div>
  </div>
</template>
