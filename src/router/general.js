import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/side-bar/Layout.vue";
import Homepage from "../pages/general/Homepage.vue";
import MovieLists from "../pages/user/MovieList.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "", // Default route for the layout
        name: "Homepage",
        component: Homepage,
      },
      {
        path: "movielists",
        name: "Movielists",
        component: MovieLists,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
