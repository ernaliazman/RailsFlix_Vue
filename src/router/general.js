import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/side-bar/Layout.vue";
import Homepage from "../pages/general/Homepage.vue";
import MovieLists from "../pages/user/MovieList.vue";
import LandingPage from "../pages/general/LandingPage.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "welcome", // Default route for the layout
        name: "LandingPage",
        component: LandingPage,
      },
      {
        path: "homepage", // Default route for the layout
        name: "Homepage",
        component: Homepage,
        meta: { requiresAuth: true },
      },
      {
        path: "movielists",
        name: "Movielists",
        component: MovieLists,
        meta: { requiresAuth: true },
      },
      
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = getAuthStatus(); // Your method to check if the user is logged in

//   if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
//     // If the route requires authentication and the user is not authenticated, redirect to the LandingPage
//     next({ name: 'LandingPage' });
//   } else {
//     // Otherwise, allow navigation
//     next();
//   }
// });

export default router;
