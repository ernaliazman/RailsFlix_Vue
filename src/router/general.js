import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/side-bar/Layout.vue";
import Homepage from "../pages/general/Homepage.vue";
import MovieLists from "../pages/user/MovieList.vue";
import LandingPage from "../pages/general/LandingPage.vue";
import authService from '../auth/auth.js';

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/welcome",
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!authService.getToken(); // Check if the user is authenticated
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ path: "/welcome" }); // Redirect to the landing page if not logged in
    } else {
      next(); // Proceed to the authenticated route
    }
  } else {
    next(); // Proceed for non-authenticated routes
  }
});

export default router;
