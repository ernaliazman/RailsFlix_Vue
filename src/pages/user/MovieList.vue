<template>
  <div class="mt-8">
    <h4 class="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
  🎬Your Movie Lists
</h4>

<div>
   

    <!-- Modal CONFIRM DELETE -->
    <Modal
      :isOpen="isModalOpen"
      @update:isOpen="isModalOpen = $event"
      :title="'Confirm Removal'"
      :body="`${selectedTitle} will be removed from your library`"
      actionText="Confirm"
      @action = "removeMovie(expectedData)"
    >
    </Modal>

       <!-- Modal CONFIRM EDIT -->
          <!-- :body="`${selectedTitle} will be updated in your library`" -->
       <Modal
      :isOpen="isModalEditOpen"
      @update:isOpen="isModalEditOpen = $event"
      :title="'Update Movie'"
      actionText="Update"
      @action = "updateMovie(updateReview, updateStatus, id)"
    >
      <!-- Form Content as a Slot -->
      <!-- v-model="expectedData.title"
      v-model="editedData.description"
      v-model="editedData.genre" -->
    <template #customBody>
  <form @submit.prevent="updateMovie(updateReview,updateStatus,id)" class="px-8 pt-6">
    <div class="w-full max-w-xs">

    <div class="mb-2">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Status
      </label>
      <!-- v-model=expectedData.status -->
    <Dropdown
      :options="dropdownOptions"
      v-model=updateStatus
      placeholder="Choose a status"
    />
    <!-- v-model =expectedData.review -->
</div>
    <div class="mb-2">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="feedback">
        Review
      </label>
      <textarea v-model =updateReview
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="feedback"   placeholder="Review">
      </textarea>
    </div>

</div>
    <!-- Submit Button -->
   
  </form>
</template>

    </Modal>

  </div>

    <!-- Filter Buttons -->
    <FilterBubble
      :genres="genre"
      :selectedGenre="selectedGenre"
      @filter-selected="setFilter"
    />
    <SearchBar
      placeholder="Search movies by title..."
      @search="handleSearch"
    />

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
              {{ row.casts }}
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
            'text-amber-800 bg-amber-100': row.status === 'Watched',
          }"
        >
          {{ row.status }}
        </span>
      </template>

      <!-- Custom slot for "actions" column -->
      <template #column-actions="{ row }">
        <div class="flex space-x-2">
          <button
            @click="openModalEdit(row)"
            class="p-2 text-blue-500 hover:text-blue-600 rounded focus:outline-none"
          >
            <!-- Edit Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <button
            @click="openModal(row)"
            class="p-2 text-red-500 hover:text-red-600 rounded focus:outline-none"
            aria-label="Delete"
          >
            <!-- Delete Icon -->
            <svg
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
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </template>
    </TableLayout>
  </div>
</template>

<script>
import { ref } from 'vue';
import { toRaw } from 'vue';
import axios from "axios";
import TableLayout from "../../components/TableLayout.vue";
import FilterBubble from "../../components/FilterBubble.vue";
import SearchBar from "../../components/SearchBar.vue";
import Alert from "../../components/Alert.vue";
import Modal from "../../components/Modal.vue";
import authService from '../../auth/auth.js';
import Dropdown from '../../components/Dropdown.vue';

export default {
  components: {
    Dropdown,
    Modal,
    Alert,
    SearchBar,
    TableLayout,
    FilterBubble,

  },
  
  data() {
    return {
      //dataToDelete: null,
      moviesLists: [],
      genre: {},
      searchQuery: "", // New search query data
      selectedGenre: "", // Currently selected genre for filtering
      columns: [
        { label: "Title", key: "original_title" },
        { label: "Directors", key: "directors" },
        { label: "Genres", key: "genres" },
        { label: "Status", key: "status" },
        { label: "Release Date", key: "released_date" },
        { label: "Score", key: "score" },
        { label: "Review", key: "review" },
        { label: "Actions", key: "actions" },
      ],
      dropdownOptions: [
        { label: 'Watched', value: 'Watched' },
        { label: 'Released', value: 'Released' },
        
       
      ],
      selectedOption: null,
      
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
    this.getMoviesList();
  },

  //MODAL POPUP DELETE
  //Expose the setup to the parents
  setup(_, { expose }) {
    const isModalOpen = ref(false);
    const isModalEditOpen = ref(false);
    const expectedData = ref(null);
   const selectedTitle = ref("");
   const updateStatus = ref("");
   const updateReview = ref("");
   const id = ref();

   const loading = ref(false);

   //Opening the modal and assigning the value the data

   const openModalEdit = (row) => {
      console.log("Row to be updated",row);
      expectedData.value = row;
      updateStatus.value = row.status;
      updateReview.value = row.review;
      id.value = row.id;

      console.log("Status",status.value);
      //selectedTitle.value = row.title;
      isModalEditOpen.value = true;
    };

    const openModal = (row) => {
      console.log("Row to be deleted",row);
      expectedData.value = row;
      selectedTitle.value = row.title;
      isModalOpen.value = true;
      console.log("Title selected",row.title);
    };

    //Closing modal after finishing
    const closeModal = () => {
      isModalOpen.value = false;
      expectedData.value = null;
      selectedTitle.value = '';
    };

    expose({
      openModal,
    });

    return {
      closeModal,
      id,
      isModalOpen,
      isModalEditOpen,
      selectedTitle,
      expectedData,
      loading,
      updateStatus,
      updateReview,
      openModal,
      openModalEdit
    };
    
  },


//METHODS
  methods: {
    handleSearch(query) {
      this.searchQuery = query; 
    },

    //UPDATE API
    async updateMovie(review,status,id){
     try{
       const response = await axios.put(
        `http://127.0.0.1:3000/api/v1/movies/${id}`,
        {
          review: review,
          status: status,
        })

        this.isModalEditOpen = false;
        this.expectedData = null;
        this.updateReview = '';
        this.updateStatus = '';
        this.getMoviesList();
     }
     catch(error){
       console.error("Error updating movie: ",error);
     }
      console.log("Data to be updated",expectedData);
    },
  
    //DELETE API
    async removeMovie(expectedData){
      this.loading = true;
      try {
        const response = await axios.delete(
          `http://127.0.0.1:3000/api/v1/movies/${expectedData.id}`
        );
        
        console.log("Deleted successfully",response.data)

        this.isModalOpen = false;
        this.expectedData = null;
        this.selectedTitle = '';
        this.getMoviesList();
        
      } catch (error) {
        console.error("Error deleting movie: ",error);
      }
    },

    //GET API
    async getMoviesList() {
      try {
        authService.setAuthHeader();
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/movies`
        );
        this.moviesLists = response.data.results;
        console.log("Data from db ",this.moviesLists)
        
      } catch (error) {
        console.error("Error fetching data: ",error);
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
  
    setFilter(selectedGenre) {
      this.selectedGenre = selectedGenre; // Update the selected genre
    },
  },
};
</script>
