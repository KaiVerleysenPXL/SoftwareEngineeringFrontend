<script setup>
import { ref, watch } from 'vue';
import NewTripView from './NewTripView.vue';
import TripsView from './TripsView.vue';
import TripSummaryView from './TripSummaryView.vue';

const selectedTab = ref('myTrips');
const tab2 = ref();
const tab3 = ref();
watch(selectedTab, () => {
  if (tab2.value) {
    tab2.value.init();
  }
  if (tab3.value) {
    tab3.value.init();
  }
});
</script>
<template>
  <v-container fluid style="padding-top: 0">
    <v-row class="tabselector" justify="center">
      <v-tabs v-model="selectedTab" slider-color="#87CEEB">
        <v-tab value="addTrip">Add Trip</v-tab>
        <v-tab value="myTrips">My Trips</v-tab>
        <v-tab value="summary">Summary</v-tab>
      </v-tabs>
    </v-row>

    <v-tabs-window v-model="selectedTab">
      <v-tabs-window-item value="addTrip"><NewTripView /></v-tabs-window-item>
      <v-tabs-window-item value="myTrips"><TripsView ref="tab2" /></v-tabs-window-item>
      <v-tabs-window-item value="summary"><TripSummaryView ref="tab3" /></v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>
<style scoped>
.tabselector {
  margin-top: 0;
}
:deep(.v-tab__slider) {
  height: 4px;
}
.v-tab--selected {
  background-color: #e7f2ff;
}
</style>
