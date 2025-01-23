<template>
    <div class="font-[sans-serif] max-sm:px-4">
        <Header/>
      <div class="min-h-screen flex flex-col items-center justify-center relative ">
        
        <div class="relative inset-0 z-0 bg-grid">
            <div v-for="(poster, index) in posterPaths" :key="index" class="poster-item">
        <img :src="getImageUrl(poster)" alt="Movie Poster" />
      </div>
        </div> <!-- Background grid -->
        <div class="relative inset-0 bg-overlay z-1"></div> <!-- Dark overlay -->
        <LoginForm v-if="currentForm === 'signIn'" @switchToSignUp="switchToSignUp"/>
        <SignUpForm v-if="currentForm === 'signUp'" @switchToSignIn="switchToSignIn" />
        
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Header from "../../components/Header.vue";
  import LoginForm from "../../pages/general/LoginForm.vue"
  import SignUpForm from "../../pages/general/SignUpForm.vue"

  export default {
    components: {
        SignUpForm,
        LoginForm,
        Header
  },
    data() {
      return {
        currentForm: "signIn", // Default to "signIn"
        posterPaths: [] 
      };
    },
    created() {
      this.fetchMovies();
    },
    methods: {
        switchToSignUp() {
      this.currentForm = "signUp"; 
    },
    switchToSignIn() {
      this.currentForm = "signIn"; 
    },
      async fetchMovies() {
        try {
          const response = await axios.get(
            'https://api.themoviedb.org/3/movie/popular?api_key=432fd6918c7280751ae578aaaa17cbac'
          );
          
          // Extract the poster_path for the first 20 movies
          this.posterPaths = response.data.results.slice(0, 20).map(movie => movie.poster_path);
          
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      },
      getImageUrl(posterPath) {
        const baseUrl = 'https://image.tmdb.org/t/p/w500'; // Base URL for poster images
        return posterPath ? baseUrl + posterPath : ''; // Return full image URL
      }
    }
  };
  </script>
  
  <style scoped>
  /* Style the background grid */
  .bg-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Create a responsive grid */
    gap: 16px; /* Space between items */
    background-image: url('https://image.tmdb.org/t/p/w500'); /* Poster images as background */
    background-size: cover;
    position: absolute;
    inset: 0;
    z-index: -1; /* Place the background grid behind the content */
  }
  
  /* Dark overlay */
  .bg-overlay {
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black for dark effect */
    position: absolute;
    inset: 0;
    z-index: 0; /* Place the overlay above the background grid */
  }
  
  /* Style the grid container */
  .poster-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Create a responsive grid */
    gap: 16px; /* Space between items */
    padding: 20px;
  }
  
  /* Style each poster item */
  .poster-item img {
    width: 100%; /* Make the image take up the full width of the grid cell */
    height: auto;
    border-radius: 8px; /* Optional: add rounded corners */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: add shadow to the images */
  }
  </style>
  