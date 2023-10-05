<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import FactoryItem from '../components/factoryItem.vue'
import FactoryItemSkeleton from '../components/factoryItemSkeleton.vue'
import { useUserStore } from '@/stores/user'
import { useFactoriesStore } from '@/stores/factories'
import { toRaw } from 'vue'

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

let allFactories: any[] = []

let lol = [
  {
    _id: '651dc9d32d97bb18ef0ff5ce',
    level: 1,
    cost: 100,
    production: 0.25,
    type: 'Wood',
    user_id: '651db600c802d3c6fbce9a26'
  },
  {
    _id: '651dc9da2d97bb18ef0ff5cf',
    level: 5,
    cost: 100,
    production: 0.25,
    type: 'Wood',
    user_id: '651db600c802d3c6fbce9a26'
  },
  {
    _id: '651dc9da2d97bb18ef0ff5cg',
    level: 5,
    cost: 100,
    production: 0.25,
    type: 'Wood',
    user_id: '651db600c802d3c6fbce9a26'
  },
  {
    _id: '651dc9da2d97bb18ef0ff5cu',
    level: 5,
    cost: 100,
    production: 0.25,
    type: 'Wood',
    user_id: '651db600c802d3c6fbce9a26'
  }
]

onBeforeMount(() => {
  console.log('onBeforeMount')
  // console.log(lol)
  // console.log(allFactories)
  // console.log('onBeforeMount')

  if (userConnected.user.length == 0) {
    console.log('fetching user')
    userConnected.fetchUser().then(() => {
      factories.fetchFactory(userConnected.user._id).then(() => {
        // console.log('1 sfdsfsfs')
        // console.log(factories.factories)
        // lol = toRaw(factories.factories)
        // console.log('2sfdsfsfs')
        allFactories = toRaw(factories.factories)
        // console.log(allFactories)
        // console.log(lol)
        // console.log('3sfdsfsfs')
        // factories.factories.forEach((factory) => {
        //   if (factory.type == props.factoryType) {
        //     notOwnedFactories.value++
        //   }
        // })
      })
    })
  }
})
// })
// console.log('4sfdsfsfs')
// console.log(lol)
</script>

<template>
  <div class="flex flex-col">
    <!--    <div v-for="n in lol">-->
    <!--      <FactoryItem-->
    <!--        :modal-id="n._id"-->
    <!--        :factory-name="factoryName"-->
    <!--        :factory-level="n.level"-->
    <!--        :borderColor="borderColor"-->
    <!--        :factory-img="factoryImg"-->
    <!--        :factory-production-img="factoryProductionImg"-->
    <!--      />-->
    <!--    </div>-->
    <div v-if="factories.factories.length == 0 || false" class="flex flex-col">
      <FactoryItemSkeleton :factory-name="factoryName" />
      <FactoryItemSkeleton :factory-name="factoryName" />
      <FactoryItemSkeleton :factory-name="factoryName" />
      <FactoryItemSkeleton :factory-name="factoryName" />
    </div>
    <div v-else class="flex flex-col">
      <div v-for="factory in factories.factories">
        {{ factory._id }}
        <template v-if="factory.type === props.factoryType">
          <FactoryItem
            :modal-id="factory._id"
            :factory-name="factoryName"
            :factory-level="factory.level"
            :borderColor="borderColor"
            :factory-img="factoryImg"
            :factory-production-img="factoryProductionImg"
          />
        </template>
      </div>
      <div v-for="n in 4 - notOwnedFactories">
        <FactoryItemSkeleton :factory-name="factoryName" />
      </div>
    </div>
  </div>
</template>
