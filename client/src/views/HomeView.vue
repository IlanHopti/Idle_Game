<script setup lang="ts">
import FactoryColumn from '../components/factoriesColumn.vue'
</script>

<template>
  <main>
    <div class="grid grid-cols-3 gap-3 p-10">
      <!-- Wood -->
      <FactoryColumn
        factoryName="Wood Factory"
        borderColor="border-wood"
        factoryImg="../../public/factories/wood_factory.png"
        factoryProductionImg="../../public/resources/wood.png"
        factory-type="Wood"
      />

      <!-- Coal -->
      <FactoryColumn
        factoryName="Coal Factory"
        borderColor="border-coal"
        factoryImg="../../public/factories/coal_factory.jpeg"
        factoryProductionImg="../../public/resources/coal.png"
        factory-type="Coal"
      />

      <!-- Stone -->
      <FactoryColumn
        factoryName="Stone Factory"
        borderColor="border-stone"
        factoryImg="../../public/factories/stone_factory.jpeg"
        factoryProductionImg="../../public/resources/stone.png"
        factory-type="Stone"
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
      />

      <!-- Gold -->
      <FactoryColumn
        factoryName="Gold Factory"
        borderColor="border-gold"
        factoryImg="../../public/factories/gold_factory.png"
        factoryProductionImg="../../public/resources/gold_ingot.png"
        factory-type="Gold"
      />

      <!-- Diamond -->
      <FactoryColumn
        factoryName="Diamond Factory"
        borderColor="border-diamond"
        factoryImg="../../public/factories/diamond_factory.jpeg"
        factoryProductionImg="../../public/resources/diamond.png"
        factory-type="Diamond"
      />
    </div>
  </main>
</template>
