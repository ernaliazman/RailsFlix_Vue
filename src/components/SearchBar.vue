<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Search...",
    },
  },
  data() {
    return {
      searchQuery: "",
    };
  },
};
</script>

<style scoped>
.search-input input {
  outline: none;
}
</style>

<template>
    <div class="search-input">
      <input
        type="text"
        v-model="searchQuery"
        :placeholder="placeholder"
        class="border border-gray-300 rounded-full p-2 w-full md:w-1/2 lg:w-1/3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none pl-10"

        @input="$emit('search', searchQuery)"
      />
    </div>
  </template>
  

  