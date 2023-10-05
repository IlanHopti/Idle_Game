<template>
  <!-- drawer init and toggle -->
  <div class="text-center">
    <button
      type="button"
      data-drawer-target="drawer-example"
      data-drawer-show="drawer-example"
      aria-controls="drawer-example"
      class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
    >
      <span
        class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
      >
        Show filters
      </span>
    </button>
  </div>

  <!-- drawer component -->
  <div
    id="drawer-example"
    class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800"
    tabindex="-1"
    aria-labelledby="drawer-label"
  >
    <h5
      id="drawer-label"
      class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      Filters
    </h5>
    <!-- Close button -->
    <button
      type="button"
      data-drawer-hide="drawer-example"
      aria-controls="drawer-example"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
    <!-- Filters for price and type -->
    <div class="mb-4">
      <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
        Price
      </label>
      <select
        id="price"
        name="price"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-gray-300"
      >
        <option>Ascendent</option>
        <option>Descendent</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
        Resources
      </label>
      <select
        id="type"
        name="type"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-gray-300"
      >
        <option>Wood</option>
        <option>Coal</option>
        <option>Stone</option>
        <option>Iron</option>
        <option>Gold</option>
        <option>Diamond</option>
      </select>
    </div>
  </div>

  <!-- marketplace -->
  <div></div>
</template>
