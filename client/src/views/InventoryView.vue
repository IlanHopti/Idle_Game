<template>
  <div class="text-center m-6">
    <h2 class="text-3xl font-bold my-6">Resources :</h2>
    <div>
      <div class="grid grid-cols-3 gap-16 m-auto">
        <div
          class="flex flex-col justify-center items-center border-2 border-solid border-wood rounded-lg w-32 pl-6 pr-6 m-auto"
        >
          <img class="w-20 h-auto" src="../../public/resources/wood.png" alt="wood" />
          <div class="text-xl font-bold">Wood</div>
          <div class="text-md font-bold">100</div>
        </div>

        <div
          class="flex flex-col justify-center items-center border-2 border-solid border-coal rounded-lg w-32 pl-6 pr-6 m-auto"
        >
          <img class="w-20 h-auto" src="../../public/resources/coal.png" alt="stone" />
          <div class="text-xl font-bold">Coal</div>
          <div class="text-md font-bold">100</div>
        </div>

        <div
          class="flex flex-col justify-center items-center border-2 border-solid border-stone rounded-lg w-32 pl-6 pr-6 m-auto"
        >
          <img class="w-20 h-auto" src="../../public/resources/stone.png" alt="stone" />
          <div class="text-xl font-bold">Stone</div>
          <div class="text-md font-bold">100</div>
        </div>

        <div
          class="flex flex-col justify-center items-center border-2 border-solid border-iron rounded-lg w-32 pl-6 pr-6 m-auto"
        >
          <img class="w-20 h-auto" src="../../public/resources/iron_ingot.png" alt="iron" />
          <div class="text-xl font-bold">Iron</div>
          <div class="text-md font-bold">100</div>
        </div>

        <div
          class="flex flex-col justify-center items-center border-2 border-solid border-gold rounded-lg w-32 pl-6 pr-6 m-auto"
        >
          <img class="w-20 h-auto" src="../../public/resources/gold_ingot.png" alt="coin" />
          <div class="text-xl font-bold">Gold</div>
          <div class="text-md font-bold">100</div>
        </div>

        <div
          class="flex flex-col justify-center items-center border-2 border-solid border-diamond rounded-lg w-32 pl-6 pr-6 m-auto"
        >
          <img class="w-20 h-auto" src="../../public/resources/diamond.png" alt="diamond" />
          <div class="text-xl font-bold">Diamond</div>
          <div class="text-md font-bold">100</div>
        </div>
      </div>
    </div>

    <h2 class="text-3xl font-bold my-6">Factories :</h2>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-6">
      <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Factory Img</th>
            <th scope="col" class="px-6 py-3">Factory Name</th>
            <th scope="col" class="px-6 py-3">Resource</th>
            <th scope="col" class="px-6 py-3">Level</th>
            <th scope="col" class="px-6 py-3">Production</th>
            <th scope="col" class="px-6 py-3">Upgrade Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <img class="w-16 m-auto" src="../../public/factories/wood_factory.png" alt="" />
            </th>
            <td class="px-6 py-4">Wood Factory</td>
            <td class="px-6 py-4">
              <img class="w-16 h-auto m-auto" src="../../public/resources/wood.png" alt="wood" />
            </td>
            <td class="px-6 py-4">2 / 10</td>
            <td class="px-6 py-4">5 / sec</td>
            <td class="px-6 py-4 flex flex-col items-center">
              <p class="flex flex-row items-center">
                10
                <img class="w-10 h-auto ml-2" src="../../public/resources/coal.png" alt="wood" />
              </p>
              <p class="flex flex-row items-center">
                20
                <img
                  class="w-10 h-auto ml-2"
                  src="../../public/resources/gold_ingot.png"
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
              <img class="w-16 m-auto" src="../../public/factories/wood_factory_2.jpeg" alt="" />
            </th>
            <td class="px-6 py-4">Wood Factory</td>
            <td class="px-6 py-4">
              <img class="w-16 h-auto m-auto" src="../../public/resources/wood.png" alt="wood" />
            </td>
            <td class="px-6 py-4">9 / 10</td>
            <td class="px-6 py-4">40 / sec</td>
            <td class="px-6 py-4 flex flex-col items-center">
              <p class="flex flex-row items-center">
                100
                <img class="w-10 h-auto ml-2" src="../../public/resources/stone.png" alt="wood" />
              </p>
              <p class="flex flex-row items-center">
                200
                <img class="w-10 h-auto ml-2" src="../../public/resources/coin.jpeg" alt="coin" />
              </p>
              <p class="flex flex-row items-center">
                200
                <img
                  class="w-10 h-auto ml-2"
                  src="../../public/resources/iron_ingot.png"
                  alt="coin"
                />
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
