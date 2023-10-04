<script setup lang="ts">
import { ref } from 'vue'
import FactoryItem from '../components/factoryItem.vue'
import FactoryItemSkeleton from '../components/factoryItemSkeleton.vue'
</script>

<template>
  <main>
    <div class="flex flex-row justify-evenly">
      <div class="flex flex-col">
        <FactoryItem
          modal-id="woodFactory"
          :factory-name="`Wood Factory`"
          :factory-level="1"
          borderColor="border-wood"
          factory-img="https://cdn.discordapp.com/attachments/1158396116388302910/1159054969782145125/woodFactory-removebg-preview.png?ex=651e7d8e&is=651d2c0e&hm=a3ebf200d8e79c9c0d9021198985d43935d9296a873e9502b84469854dab9a58&"
        />
        <FactoryItemSkeleton :factory-name="`Wood Factory`" />
        <FactoryItemSkeleton :factory-name="`Wood Factory`" />
        <FactoryItemSkeleton :factory-name="`Wood Factory`" />
      </div>
      <div class="flex flex-col">
        <FactoryItem
          modal-id="stoneFactory"
          :factory-name="`Stone Factory`"
          :factory-level="1"
          borderColor="border-stone"
          factory-img="https://cdn.discordapp.com/attachments/1158396116388302910/1159054818787209258/48d073e4-982c-48c2-80b4-d28b2557abbe.jpeg?ex=651e7d6a&is=651d2bea&hm=5a0d995976351f7dacbb94e9b05ee12ac85d5a50caff787068a66dca525c88b8&"
        />
        <FactoryItemSkeleton :factory-name="`Stone Factory`" />
        <FactoryItemSkeleton :factory-name="`Stone Factory`" />
        <FactoryItemSkeleton :factory-name="`Stone Factory`" />
      </div>
    </div>
  </main>
</template>
