import LoginView from '@/views/LoginView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import NewTripView from '../views/NewTripView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/trips/new',
      name: 'NewTrip',
      component: NewTripView
    }
  ],
});

export default router;
