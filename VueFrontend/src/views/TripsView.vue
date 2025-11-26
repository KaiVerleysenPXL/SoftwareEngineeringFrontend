<template>
  <div>
    <h2>My Trips</h2>
    <v-btn 
      color="primary"
      class="mt-4"
      @click="goToNewTrip"
    >
      Create New Trip
    </v-btn>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goToNewTrip() {
  router.push("/trips/new");
}
</script>
