<template>
    <div class="mt-8">
      <h4 class="text-gray-600">Wide Table</h4>
  
      <TableLayout :data="moviesLists" :columns="columns">
        <!-- Custom slot for "name" column -->
        <template #column-original_title="{ row }">
          <div class="flex items-center">
            <div class="flex-shrink-0 w-10 h-10">
              <img
                class="w-10 h-10 rounded-full"
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
        <!-- Custom slot for "status" column for customization for row-->
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
    </TableLayout>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import TableLayout from '../../components/TableLayout.vue';
import { stringifyQuery } from 'vue-router';
  
  export default {
    components: {
      TableLayout,
    },
    data() {
      return {
        moviesLists:[],
        genre:{},
        credits:[],
        status: "",
        // tableData: [
        //   {
        //     name: 'John Doe',
        //     email: 'john.doe@example.com',
        //     title: 'Software Engineer',
        //     title2: 'Backend Developer',
        //     status: 'Active',
        //     role: 'Admin',
        //     profileImage:
        //       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        //   },
        //   {
        //     name: 'Jane Smith',
        //     email: 'jane.smith@example.com',
        //     title: 'UI Designer',
        //     title2: 'Frontend Specialist',
        //     status: 'Inactive',
        //     role: 'User',
        //     profileImage:
        //       'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        //   },
        // ],
        columns: [
          { label: 'Title', key: 'original_title' },
          { label: 'Directors', key: 'directors' },
          { label: 'Genres', key: 'genres' },
          { label: 'Status', key: 'status' },
          { label: 'Release Date', key: 'release_date' },
          { label: 'Score', key: 'vote_average' },
        ],
      };
    },
    mounted(){
        this.getMoviesData()


    },

    methods:{
        async getMoviesData() {
            await this.getGenre();  // First fetch genres
            await this.getMoviesList();   // Then fetch movie data
  },

        async getMoviesList(){
            try{
                const response = await axios.get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=432fd6918c7280751ae578aaaa17cbac`
                );

                //Map the expected data from API into the movie lists
                //Directors and status are from different API
                const movies = response.data.results.map(async (movie)=>{
                    const directors = await this.getCredits(movie.id); //Get the directors based on the movie
                    const status = await this.getStatus(movie.id);
                    const cast = await this.getCasts(movie.id);
                    return {
                    title: movie.original_title,
                    genres: movie.genre_ids.map((id) => this.genre[id]||'Unknown').join(','),
                    release_date: movie.release_date,
                    vote_average: Math.trunc(movie.vote_average *10)+'%',
                    directors,
                    status,
                    cast,
                    poster_path: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                    };
                });

                //Await for all data to be included
                this.moviesLists = await Promise.all(movies);
                
                console.log("Hello",this.moviesLists);
            }catch(error){
                console.log(error);
            }
            
        },
        async getGenre(){
            try{
                const response = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=432fd6918c7280751ae578aaaa17cbac`
                );

                //Map the data from api by the ID and name
                this.genre = response.data.genres.reduce((acc, genre) => {
                    acc[genre.id] = genre.name;
                    return acc;
                });

                console.log(this.genre);
            }catch(error){
                console.log(error);
            }
        },
        async getCasts(movieId) {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=432fd6918c7280751ae578aaaa17cbac`); 
     
                 const cast = response.data;
      
                // Extract the cast information (name and character)

                const casts = cast.cast
                .slice(0, 5)  // Get the first 5 actors
                .map(actor => actor.name);

                // Join the first 5 actors with a comma
                return casts.join(', ');
                
      
      // Return the formatted cast as a comma-separated string or array (depending on your needs)
            return casts;
            } catch (error) {
                console.error('Failed to fetch cast:', error);
                return []; // Return an empty array if the request fails
            }
        },

        async getCredits(movieId) {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=432fd6918c7280751ae578aaaa17cbac`); // Replace with your credits API endpoint
     
                 this.credits = response.data;

                // Extract directors from the crew array
                const directors = this.credits.crew
                .filter(crewMember => crewMember.job === 'Director')
                .map(director => director.name);

                // Join directors with a comma if there are multiple
                return directors.join(', '); 
        } catch (error) {
                console.error('Failed to fetch credits:', error);
                return '';
        }
    },

    async getStatus(movieId) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=432fd6918c7280751ae578aaaa17cbac`); // Replace with your movie status API endpoint
    
       this.statusData = await response.data;

       // Return the status of the movie
      return this.statusData.status; 

    } catch (error) {
      console.error('Failed to fetch movie status:', error);
      return 'Unknown'; // Return a default status if the request fails
    }
  },
    },


}
        
            
  </script>
  