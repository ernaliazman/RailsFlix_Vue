<script>
export default {
  props: {
    genres: {
      type: Object,
      required: true,
    },
    selectedGenre: {
      type: String,
      default: "",
    },
  },
  methods: {
    selectFilter(id) {
      this.$emit("filter-selected", id); // Emit the selected genre
    },
    clearFilter() {
      this.$emit("filter-selected", ""); // Emit empty string to clear filter
    },
  },
};
</script>

<style scoped>
button {
  transition: all 0.2s ease;
}
</style>

<template>
    <div class="mb-4">
      <button
        v-for="(name, id) in genres"
        :key="id"
        @click="selectFilter(id)"
        :class="[ 
          'px-4 py-2 mr-2 rounded-full text-sm font-medium',
          id === selectedGenre
            ? 'bg-[#A93428] text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
      >
        {{ name }}
      </button>
      <button
        @click="clearFilter"
        class="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
      >
        Clear Filter
      </button>
    </div>
  </template>
  

  