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
    rowsPerPage: {
      type: Number,
      default: 8, // Default limit to 8 rows per page
    },
  },
  data() {
    return {
      currentPage: 1, // Tracks the current page
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.data.length / this.rowsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.data.slice(start, end);
    },
  },
  methods: {
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>


<template>
  <div class="flex flex-col mt-6">
    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
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
            <tr
              v-for="(row, rowIndex) in paginatedData"
              :key="rowIndex"
            >
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

        <!-- Pagination -->
        <div class="mt-2 mb-2">
          <div class="flex justify-center space-x-2">
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 text-indigo-700 bg-white border border-gray-200 rounded-l hover:bg-gray-500 hover:text-white disabled:opacity-50"
            >
              Previous
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              @click="changePage(page)"
              :class="{
                'bg-[#A93428] hover:bg-gray-500 text-white': currentPage === page,
                'text-indigo-700 bg-white hover:bg-gray-500 hover:text-white':
                  currentPage !== page,
              }"
              class="px-3 py-2 border border-gray-200"
            >
              {{ page }}
            </button>
            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 text-indigo-700 bg-white border border-gray-200 rounded-r hover:bg-indigo-500 hover:text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
