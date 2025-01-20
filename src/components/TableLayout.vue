<!-- components/DynamicTable.vue -->
<template>
    <div class="flex flex-col mt-6">
      <div
        class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  v-for="(column, index) in columns"
                  :key="index"
                  class="px-6 py-3 text-xs font-medium leading-4 flex-wrap tracking-wider text-left text-black uppercase bg-[#A93428] border-b border-gray-200"
                >
                  {{ column.label }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="(row, rowIndex) in data" :key="rowIndex">
                <td
                  v-for="(column, colIndex) in columns"
                  :key="colIndex"
                  class="px-6 py-4 border-b border-gray-200 whitespace-wrap"
                >
                  <!-- Render slot if available, else render data dynamically -->
                  <slot
                    :name="`column-${column.key}`"
                    :row="row"
                    :column="column"
                  >
                    {{ row[column.key] }}
                  </slot>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: {
        type: Array,
        required: true,
      },
      columns: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  