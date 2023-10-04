<script setup lang="ts">
import FactoryItem from '../components/factoryItem.vue'
import FactoryItemSkeleton from '../components/factoryItemSkeleton.vue'
import { useFactoriesStore } from '@/stores/factories'
import { useUserStore } from '@/stores/user'
import WoodFactory from '@/assets/factories/wood_factory.png'
import StoneFactory from '@/assets/factories/stone_factory.png'

const userConnected = useUserStore()
const factories = useFactoriesStore()

if (userConnected.user.length == 0) {
  console.log('fetching user')
  userConnected.fetchUser().then(() => {
    factories.fetchFactory(userConnected.user._id).then(() => {
      console.log(factories.factories)
    })
  })
}
</script>

<template>
  <main>
    <div class="flex flex-row justify-evenly">
      <div class="flex flex-col">
        <div v-if="factories.factories.length == 0 || false" class="flex flex-col">
          <FactoryItemSkeleton :factory-name="`Wood Factory`" />
          <FactoryItemSkeleton :factory-name="`Wood Factory`" />
          <FactoryItemSkeleton :factory-name="`Wood Factory`" />
          <FactoryItemSkeleton :factory-name="`Wood Factory`" />
        </div>
        <div v-else class="flex flex-col">
          <div v-for="factory in factories.factories" key="factory._id">
            <FactoryItem
              modal-id="woodFactory"
              :factory-name="`Wood Factory`"
              :factory-level="factory.level"
              borderColor="border-wood"
              :factory-img="WoodFactory"
            />
          </div>
          <div v-for="n in 4 - factories.factories.length">
            <FactoryItemSkeleton :factory-name="`Wood Factory`" />
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <FactoryItem
          modal-id="stoneFactory"
          :factory-name="`Stone Factory`"
          :factory-level="1"
          borderColor="border-stone"
          :factory-img="StoneFactory"
        />
        <FactoryItemSkeleton :factory-name="`Stone Factory`" />
        <FactoryItemSkeleton :factory-name="`Stone Factory`" />
        <FactoryItemSkeleton :factory-name="`Stone Factory`" />
      </div>
    </div>
  </main>
</template>
