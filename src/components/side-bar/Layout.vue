
<script>
import Sidebar from "./Sidebar.vue";

export default {
  components: {
    Sidebar,
  },

  computed:{
    showSidebar() {
      // Show the sidebar only for authenticated routes
      return this.$route.meta.requiresAuth;
      
    }

  },
};
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar (fixed width) -->
    <Sidebar v-if="showSidebar" class="w-64 bg-gray-800 text-white" />

    <!-- Main Content (table) -->
    <div class="flex-1 p-6 overflow-x-auto">
      <router-view />
    </div>
  </div>
</template>
  

  