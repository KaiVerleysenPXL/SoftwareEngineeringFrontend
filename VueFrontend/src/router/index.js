import LoginView from '@/views/LoginView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import NewTripView from '../views/NewTripView.vue';
import TripsView from '../views/TripsView.vue';
import HomePageView from '@/views/HomePageView.vue';
import ManagerTripsView from '@/views/ManagerTripsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: HomePageView,
    },
    {
      path: '/trips/new',
      name: 'NewTrip',
      component: NewTripView
    },
    {
      path: '/trips',
      name: 'Trips',
      component: TripsView
    },
    {
      path: '/manager/trips',
      name: 'ManagerTrips',
      component: ManagerTripsView
    }
  ],
});

export default router;
