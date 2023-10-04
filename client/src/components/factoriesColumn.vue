<script setup lang="ts">
import { ref } from 'vue'
import FactoryItem from '../components/factoryItem.vue'
import FactoryItemSkeleton from '../components/factoryItemSkeleton.vue'

const props = defineProps<{
  factoryName: string
  modalId: string
  factoryLevel: number
  borderColor: string
  factoryImg: string
  factoryProductionImg: string
}>()
</script>

<template>
  <div class="flex flex-col">
    <FactoryItem
      :modal-id="modalId"
      :factory-name="factoryName"
      :factory-level="factoryLevel"
      :borderColor="borderColor"
      :factory-img="factoryImg"
      :factory-production-img="factoryProductionImg"
    />
    <FactoryItemSkeleton :factory-name="factoryName" />
    <FactoryItemSkeleton :factory-name="factoryName" />
    <FactoryItemSkeleton :factory-name="factoryName" />
  </div>
</template>
