<template>
    <div
      v-if="visible"
      class="inline-flex w-full max-w-sm ml-3 overflow-hidden bg-white rounded-lg shadow-md animate-slide-up"
    >
      <div :class="`flex items-center justify-center w-12 ${alertColorClass}`">
        <svg
          class="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
          />
        </svg>
      </div>
  
      <div class="px-4 py-2 -mx-3">
        <div class="mx-3">
          <span :class="`font-semibold ${alertTextColorClass}`">{{ title }}</span>
          <p class="text-sm text-gray-600">{{ message }}</p>
        </div>
      </div>
  
      <button
        @click="closeAlert"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'success', // 'success', 'error', 'warning', etc.
      },
      duration: {
        type: Number,
        default: 5000, // Duration in ms
      },
    },
    data() {
      return {
        visible: true,
      };
    },
    computed: {
      alertColorClass() {
        return this.type === 'success'
          ? 'bg-green-500'
          : this.type === 'error'
          ? 'bg-red-500'
          : this.type === 'warning'
          ? 'bg-yellow-500'
          : 'bg-blue-500';
      },
      alertTextColorClass() {
        return this.type === 'success'
          ? 'text-green-500'
          : this.type === 'error'
          ? 'text-red-500'
          : this.type === 'warning'
          ? 'text-yellow-500'
          : 'text-blue-500';
      },
    },
    methods: {
      closeAlert() {
        this.visible = false;
      },
    },
    mounted() {
      setTimeout(() => {
        this.closeAlert();
      }, this.duration);
    },
  };
  </script>
  
  <style scoped>
  @keyframes slide-up {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  
  .animate-slide-up {
    animation: slide-up 0.5s ease-out;
  }
  </style>
  