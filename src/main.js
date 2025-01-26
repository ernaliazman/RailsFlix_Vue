import { createApp } from 'vue'
//import './style.css'
import axios from 'axios';
import Swal from "sweetalert2";
import router from './router/general.js';
import App from './App.vue';

import "./index.css"; // 

const app = createApp(App);


// Make Axios available globally in the Vue app
//app.config.globalProperties.$swal = Swal;
app.config.globalProperties.$axios = axios;
app.use(router);
app.mount('#app');



