import LoginView from '@/views/LoginView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import NewTripView from '../views/NewTripView.vue';
import TripSummaryView from '../views/TripSummaryView.vue';
import HomePageView from '@/views/HomePageView.vue';
import ManagerTripsView from '@/views/ManagerTripsView.vue';
import UserView from '@/views/UserView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
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
      component: NewTripView,
    },
    {
      path: '/trips',
      name: 'Trips',
      component: UserView,
    },
    {
      path: '/trips/summary',
      name: 'TripSummary',
      component: TripSummaryView,
    },
    {
      path: '/admin',
      name: 'ManagerTrips',
      component: ManagerTripsView,
    },
  ],
});

export default router;
