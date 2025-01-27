<template>
    <div class="relative inline-block w-full">
      <!-- Dropdown Button -->
      <button
      name="status"
        @click="toggleDropdown"
        class="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span>{{ selectedLabel || placeholder }}</span>
        <!-- Arrow Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 ml-2 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
  
      <!-- Dropdown Menu -->
      <div
        v-if="isOpen"
        class="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg"
      >
        <ul class="py-1 text-sm text-gray-700">
          <li
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
            class="px-4 py-2 text-left hover:bg-[#A93428] hover:text-white cursor-pointer" 
            >
            {{ option.label }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      options: {
        type: Array,
        required: true,
      },
      placeholder: {
        type: String,
        
        default: 'Select an option',
      },
      modelValue: {
        type: [String, Number, Object, null],
        default: null,
      },
    },
    data() {
      return {
        isOpen: false,
      };
    },
    computed: {
      selectedLabel() {
        const selected = this.options.find(
          (option) => option.value === this.modelValue
        );
        return selected ? selected.label : null;
      },
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
      selectOption(option) {
        this.$emit('update:modelValue', option.value);
        this.isOpen = false;
      },
    },
  };
  </script>
  