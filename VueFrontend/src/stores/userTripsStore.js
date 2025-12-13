import { defineStore } from 'pinia';

export const useUserTripsStore = defineStore('userTrips', {
  state: () => ({
    trips: null,
  }),
});
