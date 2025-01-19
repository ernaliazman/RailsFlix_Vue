
<script>
import Sidebar from "./Sidebar.vue";

export default {
  components: {
    Sidebar,
  },
};
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar (fixed width) -->
    <Sidebar class="w-64 bg-gray-800 text-white" />

    <!-- Main Content (table) -->
    <div class="flex-1 p-6 overflow-x-auto">
      <router-view />
    </div>
  </div>
</template>
  

  