// src/router/index.js

import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LogIn from '../views/LogIn.vue'; // Fix the filename to match your actual file
import Register from '../views/Register.vue';
import Build from '../views/OdabirDijelova.vue';
import { auth } from '@/router/firebase'; // Import Firebase authentication correctly

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn, // Use the correct import path and file name
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/build',
    name: 'build',
    component: Build,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Firebase Authentication Navigation Guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);
  const isAuthenticated = auth.currentUser; // Check if user is authenticated

  if (requiresAuth && !isAuthenticated) {
    // If the route requires authentication and the user is not logged in, redirect to login
    next('/login');
  } else if (requiresGuest && isAuthenticated) {
    // If the route is for guests only and the user is authenticated, redirect to home
    next('/');
  } else {
    // If no conditions apply, proceed as normal
    next();
  }
});

export default router;
