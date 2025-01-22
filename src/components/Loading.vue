<template>
  <svg
    :class="spinnerClass"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
      fill="none"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M4 12a8 8 0 0 1 8-8m0 0a8 8 0 0 1 8 8m-8 0a8 8 0 0 1-8 8"
    />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '6', // Default size (tailwind width/height class)
    },
    color: {
      type: String,
      default: 'currentColor', // Default stroke color
    },
  },
  computed: {
    spinnerClass() {
      return `w-${this.size} h-${this.size} animate-spin text-${this.color}`;
    },
  },
};
</script>

<style scoped>
/* Add additional scoped styles here if necessary */
</style>
