<template>
  <div class="mt-8">
    <h4
      class="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4"
    >
      🎬Movie Lists
    </h4>

    <!-- Filter Buttons -->
    <FilterBubble
      :genres="genre"
      :selectedGenre="selectedGenre"
      @filter-selected="setFilter"
    />

    <div class="flex justify-between items-center">
      <!-- Search Bar on the left -->
      <SearchBar
        placeholder="Search movies by title..."
        @search="handleSearch"
        class="w-full"
      />

      <!-- Alert on the right -->
      <!-- <Alert
      title="Success"
      message="Your account was registered!"
      type="success"
      :duration="5000"
    /> -->
    </div>

    <!-- Movie Table -->
    <TableLayout :data="filteredMovies" :columns="columns">
      <!-- Custom slot for "original_title" column -->
      <template #column-original_title="{ row }">
        <div class="flex items-center">
          <div class="flex-shrink-0 w-10 h-10">
            <img
              class="w-10 h-10 square"
              :src="row.poster_path"
              alt="profile pic"
            />
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium leading-5 text-gray-900">
              {{ row.title }}
            </div>
            <div class="text-sm leading-5 text-gray-500">
              {{ row.cast }}
            </div>
          </div>
        </div>
      </template>

      <!-- Custom slot for "status" column -->
      <template #column-status="{ row }">
        <span
          :class="{
            'inline-flex px-2 text-s font-semibold leading-5 rounded-full': true,
            'text-green-800 bg-green-100': row.status === 'Released',
            'text-red-800 bg-red-100': row.status === 'Inactive',
          }"
        >
          {{ row.status }}
        </span>
      </template>

      <!-- Custom slot for "actions" column -->
      <template #column-actions="{ row }">
        <div class="flex space-x-2">
          <!-- Show the loading spinner if isLoading is true -->
          <button
            v-if="row.isLoading"
            class="p-2 text-yellow-500 hover:text-green-600 rounded focus:outline-none"
          >
            <!-- Loading Spinner -->
            <Loading size="5" color="green-500" />
          </button>

          <!-- Show the SVG button if isLoading is false -->
          <button
            v-else
            @click="toggleClick(row)"
            class="p-2 text-amber-500 hover:text-blue-600 rounded focus:outline-none"
          >
            <!-- If clicked, show filled icon; otherwise, show outlined icon -->
            <svg
              v-if="row.clicked"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>

            <!-- If not clicked, show outlined icon -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          </button>
        </div>
      </template>
    </TableLayout>
  </div>
</template>

<script>
import axios from "axios";
import TableLayout from "../../components/TableLayout.vue";
import FilterBubble from "../../components/FilterBubble.vue";
import SearchBar from "../../components/SearchBar.vue";
import Alert from "../../components/Alert.vue";
import Loading from "../../components/Loading.vue";
import authService from "../../auth/auth.js";

export default {
  components: {
    Loading,
    Alert,
    SearchBar,
    TableLayout,
    FilterBubble,
  },
  data() {
    return {
      user_id: '',
      clicked: false,
      userMovieLists: [],
      moviesLists: [],
      genre: {},
      searchQuery: "",
      selectedGenre: "",
      columns: [
        { label: "Title", key: "original_title" },
        { label: "Directors", key: "directors" },
        { label: "Genres", key: "genres" },
        { label: "Status", key: "status" },
        { label: "Release Date", key: "release_date" },
        { label: "Score", key: "vote_average" },
        { label: "Actions", key: "actions" },
      ],
    };
  },
  computed: {
    filteredMovies() {
      let movies = this.moviesLists;

      // Apply genre filter
      if (this.selectedGenre) {
        movies = movies.filter((movie) =>
          movie.genres.includes(this.genre[this.selectedGenre])
        );
      }

      // Apply search filter
      if (this.searchQuery) {
        movies = movies.filter((movie) =>
          movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return movies;
    },
  },
  mounted() {
    this.user_id = authService.getUserId();
    console.log("User id", this.user_id)
    this.getUsersMovies().then(() => {
      this.getMoviesData();
    });
  },
  methods: {
    async toggleClick(row) {
      try {
        row.isLoading = true;

        if (row.clicked) {
          await this.removeMovie(row);
        } else {
          await this.insertMoviesLibrary(row);
        }

        row.clicked = !row.clicked;
        row.showAlert = true;
      } catch (error) {
        console.error("Error sending movie data:", error);
      } finally {
        row.isLoading = false;
      }
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
    //DELETE API
    //Remove movie from bookmark
    async removeMovie(row) {
      this.loading = true;
      try {
        const response = await axios.delete(
          `http://127.0.0.1:3000/api/v1/movies/${row.id}`
        );

        console.log("Deleted successfully", response.data);

        this.mounted();
      } catch (error) {
        console.error("Error deleting movie: ", error);
      }
    },

    //POST METHOD
    async insertMoviesLibrary(row) {
      try {
        const mapToApi = {
          id: row.id,
          title: row.title,
          casts: row.cast,
          directors: row.directors,
          genres: row.genres,
          status: row.status,
          released_date: row.release_date,
          score: row.vote_average,
          poster_path: row.poster_path,
          user_id: this.user_id,
        };
        const response = await axios.post(
          `http://127.0.0.1:3000/api/v1/movies`,
          mapToApi
        );
        console.log("Movie added successfully:", response.data);
        return response;
      } catch (error) {
        console.error("Error adding movie:", error);
        throw error;
      }
    },

    //GET METHOD
    async getUsersMovies() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/movies/${this.user_id}`
        );
        this.userMovieLists = response.data.results;
        console.log("Data from db ", this.userMovieLists);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
    async getMoviesData() {
      await this.getGenre();
      await this.getMoviesList();
    },
    async getMoviesList() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=432fd6918c7280751ae578aaaa17cbac`
          //  `${process.env.TMBD_API}/discover/movie?api_key=${process.env.API_KEY}`
        );
        console.log("response test", response);
        const movies = response.data.results.map(async (movie) => {
          const directors = await this.getCredits(movie.id);
          const status = await this.getStatus(movie.id);
          const cast = await this.getCasts(movie.id);

          // Check if the movie exists in the user's list
          //Return true if exists
          const matched = this.userMovieLists.some(
            (userMovie) => userMovie.id === movie.id
          );

          return {
            id: movie.id,
            title: movie.original_title,
            genres: movie.genre_ids
              .map((id) => this.genre[id] || "Unknown")
              .join(", "),
            release_date: movie.release_date,
            vote_average: Math.trunc(movie.vote_average * 10) + "%",
            directors,
            status,
            cast,
            poster_path: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            clicked: matched,
          };
        });
        this.moviesLists = await Promise.all(movies);
      } catch (error) {
        console.error(error);
      }
    },
    async getGenre() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=432fd6918c7280751ae578aaaa17cbac`
        );
        this.genre = response.data.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        });
      } catch (error) {
        console.error(error);
      }
    },
    async getCasts(movieId) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=432fd6918c7280751ae578aaaa17cbac`
        );

        const cast = response.data;

        const casts = cast.cast.slice(0, 5).map((actor) => actor.name);

        return casts.join(", ");

        return casts;
      } catch (error) {
        console.error("Failed to fetch cast:", error);
        return []; // Return an empty array if the request fails
      }
    },

    async getCredits(movieId) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=432fd6918c7280751ae578aaaa17cbac`
        ); // Replace with your credits API endpoint

        this.credits = response.data;

        const directors = this.credits.crew
          .filter((crewMember) => crewMember.job === "Director")
          .map((director) => director.name);

        return directors.join(", ");
      } catch (error) {
        console.error("Failed to fetch credits:", error);
        return "";
      }
    },

    async getStatus(movieId) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=432fd6918c7280751ae578aaaa17cbac`
        );

        this.statusData = await response.data;

        return this.statusData.status;
      } catch (error) {
        console.error("Failed to fetch movie status:", error);
        return "Unknown";
      }
    },
    setFilter(selectedGenre) {
      this.selectedGenre = selectedGenre;
    },
  },
};
</script>
