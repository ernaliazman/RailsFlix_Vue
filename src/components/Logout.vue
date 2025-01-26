<template>

  <button @click="logout" class="logout-button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-7"
    >
    
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
      />
    </svg>
    
  </button>
</template>

<script>
import authService from "../auth/auth.js"; // Ensure authService is set up to handle token removal

export default {
  name: "Logout",
  methods: {
    logout() {
      authService.removeToken(); // Remove token from storage
      this.$router.push("/welcome"); // Redirect to landing page
    },
  },
};
</script>

<style scoped>
.logout-button {
  
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.logout-button:hover {
 
}
</style>
