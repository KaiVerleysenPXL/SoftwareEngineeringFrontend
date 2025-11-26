<template>
  <div>
    <h2>HomePage</h2>
    <v-btn 
      color="primary"
      class="mt-4"
      @click="goToTrips"
    >
      Go to Trips
    </v-btn>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goToTrips() {
  router.push("/trips");
}
</script>
