<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-6">
    <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
      <!-- Table head -->
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Factory Img</th>
          <th scope="col" class="px-6 py-3">Factory Name</th>
          <th scope="col" class="px-6 py-3">Resource</th>
          <th scope="col" class="px-6 py-3">Level</th>
          <th scope="col" class="px-6 py-3">Production</th>
          <th scope="col" class="px-6 py-3">Upgrade Cost</th>
        </tr>
      </thead>

      <!-- Table body -->
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <img class="w-16 m-auto" src="../../../public/factories/wood_factory.png" alt="" />
          </th>
          <td class="px-6 py-4">Wood Factory</td>
          <td class="px-6 py-4">
            <img class="w-16 h-auto m-auto" src="../../../public/resources/wood.png" alt="wood" />
          </td>
          <td class="px-6 py-4">2 / 10</td>
          <td class="px-6 py-4">5 / sec</td>
          <td class="px-6 py-4 flex flex-col items-center">
            <p class="flex flex-row items-center">
              10
              <img class="w-10 h-auto ml-2" src="../../../public/resources/coal.png" alt="wood" />
            </p>
            <p class="flex flex-row items-center">
              20
              <img
                class="w-10 h-auto ml-2"
                src="../../../public/resources/gold_ingot.png"
                alt="coin"
              />
            </p>
          </td>
        </tr>
        <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <img class="w-16 m-auto" src="../../../public/factories/wood_factory_2.jpeg" alt="" />
          </th>
          <td class="px-6 py-4">Wood Factory</td>
          <td class="px-6 py-4">
            <img class="w-16 h-auto m-auto" src="../../../public/resources/wood.png" alt="wood" />
          </td>
          <td class="px-6 py-4">9 / 10</td>
          <td class="px-6 py-4">40 / sec</td>
          <td class="px-6 py-4 flex flex-col items-center">
            <p class="flex flex-row items-center">
              100
              <img class="w-10 h-auto ml-2" src="../../../public/resources/stone.png" alt="wood" />
            </p>
            <p class="flex flex-row items-center">
              200
              <img class="w-10 h-auto ml-2" src="../../../public/resources/coin.jpeg" alt="coin" />
            </p>
            <p class="flex flex-row items-center">
              200
              <img
                class="w-10 h-auto ml-2"
                src="../../../public/resources/iron_ingot.png"
                alt="coin"
              />
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
