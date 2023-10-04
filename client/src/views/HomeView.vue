<script setup lang="ts">
import FactoryColumn from '../components/factoriesColumn.vue'

</script>

<template>
  <main>
    <div class="grid grid-cols-3 gap-3 p-10">
      <!-- Wood -->
      <FactoryColumn
        factoryName="Wood Factory"
        modalId="woodFactory"
        :factoryLevel="1"
        borderColor="border-wood"
        factoryImg="../../public/factories/wood_factory.png"
        factoryProductionImg="../../public/resources/wood.png"
      />

      <!-- Coal -->
      <FactoryColumn
        factoryName="Coal Factory"
        modalId="coalFactory"
        :factoryLevel="1"
        borderColor="border-coal"
        factoryImg="../../public/factories/coal_factory.jpeg"
        factoryProductionImg="../../public/resources/coal.png"
      />

      <!-- Stone -->
      <FactoryColumn
        factoryName="Stone Factory"
        modalId="stoneFactory"
        :factoryLevel="1"
        borderColor="border-stone"
        factoryImg="../../public/factories/stone_factory.jpeg"
        factoryProductionImg="../../public/resources/stone.png"
      />

      <div class="w-full border-t-2 border-dashed border-black"></div>
      <div class="w-full border-t-2 border-dashed border-black"></div>
      <div class="w-full border-t-2 border-dashed border-black"></div>

      <!-- Iron -->
      <FactoryColumn
        factoryName="Iron Factory"
        modalId="ironFactory"
        :factoryLevel="1"
        borderColor="border-iron"
        factoryImg="../../public/factories/iron_factory.png"
        factoryProductionImg="../../public/resources/iron_ingot.png"
      />

      <!-- Gold -->
      <FactoryColumn
        factoryName="Gold Factory"
        modalId="goldFactory"
        :factoryLevel="1"
        borderColor="border-gold"
        factoryImg="../../public/factories/gold_factory.png"
        factoryProductionImg="../../public/resources/gold_ingot.png"
      />

      <!-- Diamond -->
      <FactoryColumn
        factoryName="Diamond Factory"
        modalId="diamondFactory"
        :factoryLevel="1"
        borderColor="border-diamond"
        factoryImg="../../public/factories/diamond_factory.jpeg"
        factoryProductionImg="../../public/resources/diamond.png"
      />
    </div>
  </main>
</template>
